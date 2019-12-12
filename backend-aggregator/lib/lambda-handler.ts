let Parser = require("rss-parser");
let parser = new Parser();

const myMediumArticlesFeed = "https://medium.com/feed/@timothy.urista";
const aiMediumaArticlesFeed = "https://medium.com/feed/tag/ai";
const cloudComputingMediumArticlesFeed =
  "https://medium.com/tag/cloud-computing";

const allFeeds = [
  myMediumArticlesFeed,
  aiMediumaArticlesFeed,
  cloudComputingMediumArticlesFeed
];

async function getAllFeeds() {
  let jsonRes: Array<any> = [];
  allFeeds.forEach(async feedUrl => {
    let feed = await parser.parseURL(feedUrl);
    console.log(feed.title);
    jsonRes = [...jsonRes, ...feedUrl];
  });
  return jsonRes;
}
export const handler = async (event: any = {}): Promise<any> => {
  try {
    const response = await getAllFeeds();
    return { statusCode: 200, body: JSON.stringify(response) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify(err) };
  }
};
