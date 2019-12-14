import React from "react";
import "./MainScreen.scss";
import BlogPostShort from "../blog-post-short/BlogPostShort";
// import { CircularProgress } from "@material-ui/core";

function MainScreen({ posts = [], loading = true }) {
  return (
    <div className="Main-Screen">
      {loading && <div className="ghost-components"></div>}

      <ul>
        {posts.map((post: any) => (
          <li key={post.id}>
            <BlogPostShort post={post} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MainScreen;
