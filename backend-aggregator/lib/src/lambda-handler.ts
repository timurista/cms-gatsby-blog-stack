const aws = require("aws-sdk");
// const ManagedUpload = require("@types/aws-sdk").S3.ManagedUpload;
const Parser = require("rss-parser");
const getArticle = require("get-medium-articles").getArticle;

const myMediumArticlesFeed = "https://medium.com/feed/@timothy.urista";
const aiMediumaArticlesFeed = "https://medium.com/feed/tag/ai";
const cloudComputingMediumArticlesFeed =
  "https://medium.com/feed/tag/cloud-computing";

const parser = new Parser();
const s3Bucket = process.env.S3_BUCKET || "";
const s3WebsiteBucket = process.env.S3_WEBSITE_BUCKET || "";

const distributionID = process.env.CF_DISTRIBUTION_ID || "";

const cloudfront = new aws.CloudFront();
const s3 = new aws.S3();

const otherFeeds = [aiMediumaArticlesFeed, cloudComputingMediumArticlesFeed];

type ManagedUpload = {
  ETag: string;
};

async function getAllFeeds() {
  let jsonRes: Array<any> = [];
  let feed = await parser.parseURL(myMediumArticlesFeed);
  jsonRes.push(feed);

  for (let feedUrl of otherFeeds) {
    // console.log(feedUrl);
    let feed = await parser.parseURL(feedUrl);

    for (let item of feed.items) {
      if (item.content) {
        item.content = await getArticle(item.link);
      } else if (item["content:encoded"]) {
        item["content:encoded"] = await getArticle(item.link);
      }
    }

    jsonRes.push(feed);
    // console.log(jsonRes);
  }
  return jsonRes;
}

async function saveFeeds(feeds: any, s3bucket: string) {
  const params = {
    Bucket: s3bucket,
    Key: "blogs/articles.json",
    Body: JSON.stringify(feeds)
  };
  var s3UploadPromise = new Promise(function(resolve, reject) {
    s3.upload(params, function(err: any, data: ManagedUpload) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
  let uploadedFile: any = {};
  try {
    uploadedFile = await s3UploadPromise;
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
  console.log("FILE UPLOADED", uploadedFile.ETag, s3bucket);
  return uploadedFile.ETag;
}

export const handler = async (event: any = {}): Promise<any> => {
  try {
    const feeds = await getAllFeeds();
    // save to website (daul write)
    await saveFeeds(feeds, s3WebsiteBucket);
    const feedsBucketUrl = await saveFeeds(feeds, s3Bucket);
    console.log("FEEDS BUCKET", feedsBucketUrl);
    return { statusCode: 200, body: JSON.stringify(feeds) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify(err) };
  }
};
