import { observable, computed, action, runInAction } from "mobx";
import axios from "axios";
import get from "lodash.get";
import HeroImage from "../components/hero-image/HeroImage";

// const CF_BACKEND_API =
//   "https://g2vtb5opa8.execute-api.us-east-1.amazonaws.com/Prod/graphql";

export interface HeroImage {
  imageUrl: string;
  title: string;
}

export interface Author {
  name: string;
  title: string;
  shortBio: string;
}

export interface Post {
  id?: string;
  seen?: boolean;
  body?: string;
  slug: string;
  publishedDate?: any;
  description?: string;
  title?: string;
  author: Author;
  heroImage: HeroImage;
  source?: string;
}

export interface Paper {
  id?: string;
  slug?: string;
  abstract: string;
  abstract_text: string;
  authors: Array<string>;
  pdf_link?: string;
  submission_date?: any;
  description?: string;
  title?: string;
}

function uniq_fast(a: any) {
  var seen: any = new Set();
  var out = [];
  var len = a.length;
  var j = 0;
  for (var i = 0; i < len; i++) {
    var item = a[i];
    if (!seen.has(item.slug)) {
      seen.add(item.slug);
      out[j++] = item;
    }
  }
  return out;
}

function convertToSlug(text: string) {
  return text
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
}

export class BlogStore {
  @observable posts: Array<Post> = [];
  @observable loading: boolean = true;
  @observable currentPost: Post | null = null;
  @observable currentPaper: Paper | null = null;
  @observable papers: Array<Paper> = [];

  constructor() {
    this.fetch((posts: any) => {
      runInAction(() => {
        this.posts = posts;
        this.loading = false;
      });
    });
  }

  @action handlePapersUpdate = (res: any) => {
    const papers = res.data;
    console.log("papers", papers);
    runInAction(() => {
      this.papers = papers.map((paper: any) => ({
        ...paper,
        slug: encodeURI(paper.title)
      }));
    });
  };

  @action fetchPapers() {
    let cached_papers_url = "../../../local-cache/blogs/papers.json";
    if (process.env.NODE_ENV === "production") {
      cached_papers_url = "/blogs/papers.json";
    }

    const res = axios({
      method: "get",
      url: cached_papers_url,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "GET,HEAD,OPTIONS",
        "Content-Type": "application/json"
      }
    }).then(this.handlePapersUpdate);

    return res;
  }

  @action async fetch(handler: Function, slug?: String) {
    // get the files from cf json
    let cached_articles_url = "/local-cache/blogs/articles.json";
    if (process.env.NODE_ENV === "production") {
      cached_articles_url = "/blogs/articles.json";
    }

    this.fetchPapers();

    const res = await axios({
      method: "get",
      url: cached_articles_url,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "GET,HEAD,OPTIONS"
      }
    });

    // console.log("papers", papersRes);
    let agg = [];
    for (let item of res.data) {
      const id = convertToSlug(item.title);
      // if (item.guid) {
      //   end = item.guid.split("/").reverse()[0];
      // }
      const seen = false;
      const body = item["content"] || item["content:encoded"];
      const title = item.title;
      const slug = id;
      // const image = body.find('src=')
      // var regex = /<img.*?src="(.*?)"/;
      // const regexed = regex.exec(body);
      // // console.log("regexed", body, regexed);
      // var src = regexed ? regexed[1] : null;
      const author = { name: item.author };
      let description = item.description;
      // if (item.contentSnippet) {
      //   description = item.contentSnippet.split("Continue reading")[0];
      // }

      const publishedDate = item.published;
      // console.log("item", heroImage, item);
      if (!item.image) {
        continue;
      }

      const heroImage = { url: item.image, title: item.title };

      const blogPost = {
        ...item,
        id,
        description,
        seen,
        body,
        slug,
        title,
        publishedDate,
        author,
        heroImage,
        source: item.title
      };
      agg.push(blogPost);
    }

    agg = uniq_fast(agg);
    agg = agg.filter(a => a != null);
    // sort
    agg.sort(
      (a, b) =>
        new Date(b.publishedDate).getTime() -
        new Date(a.publishedDate).getTime()
    );
    handler(agg);
  }

  @computed get completedCount() {
    return this.posts.filter(todo => todo.seen === true).length;
  }

  @action
  fetchCurrentPaper(slug: String) {
    if (get(this.currentPaper, "slug") === slug) {
      return;
    }
    const paper = this.papers.find(paper => paper.slug === slug);
    if (paper) {
      this.currentPaper = paper;
    } else {
      this.loading = true;
      this.fetchPapers().then((res: any) =>
        runInAction(() => {
          this.currentPaper =
            this.papers.find((d: Paper) => d.slug === slug) || null;
          this.loading = false;
        })
      );
    }
  }

  @action
  fetchCurrentPost(slug: String) {
    console.log("SLUG FETCHING", slug, get(this.currentPost, "slug"));
    if (get(this.currentPost, "slug") === slug) {
      return null;
    }
    const post = this.posts.find(post => post.slug === slug);
    console.log("POSTS", this.posts);
    if (post) {
      this.currentPost = post;
    } else {
      this.loading = true;
      this.fetch(
        (res: any) =>
          runInAction(() => {
            console.log(
              "THE RES",
              res.find((d: Post) => d.slug === slug)
            );
            this.currentPost = res.find((d: Post) => d.slug === slug);
            this.loading = false;
          }),
        slug
      );
    }
  }

  report() {
    if (this.posts.length === 0) return "<none>";
    return (
      `Next todo: "${this.posts[0].title}". ` +
      `Progress: ${this.completedCount}/${this.posts.length}`
    );
  }
}

export default new BlogStore();
