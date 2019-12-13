const aws = require("aws-sdk");
// const ManagedUpload = require("@types/aws-sdk").S3.ManagedUpload;
const Parser = require("rss-parser");

const myMediumArticlesFeed = "https://medium.com/feed/@timothy.urista";
const aiMediumaArticlesFeed = "https://medium.com/feed/tag/ai";
const cloudComputingMediumArticlesFeed =
  "https://medium.com/feed/tag/cloud-computing";

const parser = new Parser();
const s3Bucket = process.env.S3_BUCKET || "";
const distributionID = process.env.CF_DISTRIBUTION_ID || "";

const cloudfront = new aws.CloudFront();
const s3 = new aws.S3();

const allFeeds = [
  myMediumArticlesFeed,
  aiMediumaArticlesFeed,
  cloudComputingMediumArticlesFeed
];

type ManagedUpload = {
  ETag: string;
};

async function getAllFeeds() {
  let jsonRes: Array<any> = [];
  for (let feedUrl of allFeeds) {
    // console.log(feedUrl);
    let feed = await parser.parseURL(feedUrl);
    jsonRes.push(feed);
    // console.log(jsonRes);
  }
  return jsonRes;
}

async function saveFeeds(feeds: any) {
  const params = {
    Bucket: s3Bucket,
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
    throw new Error(e);
  }
  console.log("FILE UPLOADED", uploadedFile.ETag);
  return uploadedFile.ETag;
}

export const handler = async (event: any = {}): Promise<any> => {
  try {
    const feeds = await getAllFeeds();
    const feedsBucketUrl = await saveFeeds(feeds);
    console.log("FEEDS BUCKET", feedsBucketUrl);
    return { statusCode: 200, body: JSON.stringify(feeds) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify(err) };
  }
};
