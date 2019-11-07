import { observable, computed, action, runInAction } from "mobx";
import axios from "axios";

const CF_BACKEND_API =
  "https://g2vtb5opa8.execute-api.us-east-1.amazonaws.com/Prod/graphql";

export interface Post {
  id?: String;
  seen: boolean;
  body?: String;
  title: String;
}

export class BlogStore {
  @observable posts: Array<Post> = [];
  @observable loading: boolean = true;

  constructor() {
    this.fetch();
  }

  @action async fetch() {
    // let data = null;
    // const { data: { err, result } } = await app.axios('/files')
    axios
      .get(CF_BACKEND_API, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
        }
      })
      .then(res => {
        runInAction(() => {
          console.log("setting result", res.data.body);
          this.posts = res.data.body;
          this.loading = false;
        });
      });
  }

  @computed get completedTodosCount() {
    return this.posts.filter(todo => todo.seen === true).length;
  }

  report() {
    if (this.posts.length === 0) return "<none>";
    return (
      `Next todo: "${this.posts[0].title}". ` +
      `Progress: ${this.completedTodosCount}/${this.posts.length}`
    );
  }

  addTodo(title: String) {
    this.posts.push({
      title: title,
      seen: false
    });
  }
}

export default new BlogStore();
