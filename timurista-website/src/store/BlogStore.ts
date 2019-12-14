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

function createDummyPosts(n: number): Array<Post> {
  let i = n;
  let arr = [];
  while (i > 0) {
    arr.push({
      id: i.toString(),
      description: "",
      seen: false,
      body: "",
      slug: "",
      title: "",
      publishedDate: new Date().toISOString(),
      author: {
        name: "",
        title: "",
        shortBio: ""
      },
      heroImage: {
        title: "",
        imageUrl: "https://via.placeholder.com/150"
      },
      source: "."
    });
    i = i - 1;
  }
  return arr;
}

export class BlogStore {
  @observable posts: Array<Post> = createDummyPosts(5);
  @observable loading: boolean = true;
  @observable currentPost: Post | null = null;

  constructor() {
    this.fetch((posts: any) => {
      runInAction(() => {
        this.posts = posts;
        this.loading = false;
      });
    });
  }

  @action async fetch(handler: Function, slug?: String) {
    console.log(slug);
    // return;
    // let data = null;
    // const { data: { err, result } } = await app.axios('/files')
    // let params = undefined;
    // if (slug) {
    //   params = { slug };
    // }

    // get the files from cf json
    let cached_articles_url =
      "http://d2z3zyrhi690um.cloudfront.net/blogs/articles.json";
    cached_articles_url =
      "https://tim-urista-web-blog-articles-distribution-v1.s3.amazonaws.com/blogs/articles.json";
    if (process.env.NODE_ENV === "production") {
      cached_articles_url = "/blogs/articles.json";
    }
    const res = await axios({
      method: "get",
      url: cached_articles_url,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "GET,HEAD,OPTIONS"
      }
    });
    let agg = [];
    for (let blog of res.data) {
      agg.push(
        ...blog.items.map((item: any) => {
          // const slug =
          const end = item.guid.split("/").reverse()[0];
          const id = end;
          const seen = false;
          const body = item["content"] || item["content:encoded"];
          const title = item.title;
          const slug = end;
          // const image = body.find('src=')
          var regex = /<img.*?src="(.*?)"/;
          const regexed = regex.exec(body);
          // console.log("regexed", body, regexed);
          var src = regexed ? regexed[1] : null;
          const heroImage = {
            imageUrl: src
          };

          const author = {
            name: item.creator,
            title: "",
            shortBio: ""
          };
          let description = "";
          if (item.contentSnippet) {
            description = item.contentSnippet.split("Continue reading")[0];
          }

          const publishedDate = item.pubDate;

          if (!heroImage.imageUrl) {
            return null;
          }

          return {
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
            source: blog.title
          };
        })
      );
    }
    console.log(agg);
    agg = agg.filter(a => a != null);
    // sort
    agg.sort(
      (a, b) =>
        new Date(b.publishedDate).getTime() -
        new Date(a.publishedDate).getTime()
    );
    handler(agg);

    // axios({
    //   method: "get",
    //   url: CF_BACKEND_API,
    //   params,
    //   headers: {
    //     "Access-Control-Allow-Origin": "*",
    //     "Access-Control-Allow-Headers": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
    //   }
    // }).then(res => handler(res));
  }

  @computed get completedCount() {
    return this.posts.filter(todo => todo.seen === true).length;
  }

  @action
  fetchCurrentPost(slug: String) {
    if (get(this.currentPost, "slug") === slug) {
      return;
    }
    const post = this.posts.find(post => post.slug === slug);
    if (post) {
      this.currentPost = post;
    } else {
      this.loading = true;
      this.fetch(
        (res: any) =>
          runInAction(() => {
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
