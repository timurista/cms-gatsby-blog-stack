import { observable, computed, action, runInAction } from "mobx";
import axios from "axios";
import get from 'lodash.get'

const CF_BACKEND_API =
  "https://g2vtb5opa8.execute-api.us-east-1.amazonaws.com/Prod/graphql";

export interface HeroImage {
  imageUrl: string;
  title: string;
}

export interface Post {
  id?: string;
  seen: boolean;
  body?: string;
  slug: string;
  title: string;
  heroImage: HeroImage;
}

export class BlogStore {
  @observable posts: Array<Post> = [];
  @observable loading: boolean = true;
  @observable currentPost: Post | null = null;

  constructor() {
    this.fetch((res: any) => {
      runInAction(() => {
      console.log("setting result", res.data);
      this.posts = res.data;
      this.loading = false;
    })});
  }

  @action async fetch(handler: Function, slug?: String) {
    // let data = null;
    // const { data: { err, result } } = await app.axios('/files')
    let params = undefined;
    if (slug) {
      params = { slug }
    }
    axios({
        method: "get",
        url: CF_BACKEND_API, 
        params,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
        }
      })
      .then(res => handler(res));
  }

  @computed get completedCount() {
    return this.posts.filter(todo => todo.seen === true).length;
  }

  @action
  fetchCurrentPost(slug: String) {
    if (get(this.currentPost, 'slug') === slug) {
      return;
    }
    const post = this.posts.find(post => post.slug === slug);
    if (post) {
      this.currentPost = post;
    } else {      
      this.loading = true;
      this.fetch((res: any) => runInAction(() => {
        console.log('server response body', res, res.data)
        this.currentPost = res.data.find((d: Post) => d.slug === slug);
        this.loading = false;
      }), slug)
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
