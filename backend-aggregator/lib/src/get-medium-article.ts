import { writeFileSync } from "fs";

const axios = require("axios");
const req = require("req-fast");
const cheerio = require("cheerio");
const fs = require("fs");
const mediumArticle =
  "https://medium.com/@jernejadamic/how-anyone-yes-you-too-can-train-their-robot-528e16acc148";

async function getArticle(articleUrl: string) {
  const res = await axios.get(articleUrl);
  console.log(res.data);
  const page = res.data;
  const $ = cheerio.load(page);
  console.log(
    $("article")
      .first()
      .html()
  );
  $("article img.gh").remove();
  let article = $("article")
    .first()
    .html();
  article = article.replace(/max\/60\//g, "max/1024/");
  //   writeFileSync("lib/src/index.html", article);
  return article;
}
// getArticle(mediumArticle);

module.exports = {
  getArticle
};

// req(mediumArticle, async function(err: any, resp: any) {
//   console.log(resp);
//   writeFileSync("lib/src/index.html", resp);
//   const html = () => cheerio.load(resp);
//   const $ = await html();
//   console.log($("article").first());
// });
