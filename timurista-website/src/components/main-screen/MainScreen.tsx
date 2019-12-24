import React from "react";
import "./MainScreen.scss";
import BlogPostShort from "../blog-post-short/BlogPostShort";
import PaperShort from "../paper-short/PaperShort";

// import { CircularProgress } from "@material-ui/core";

function MainScreen({ posts = [], papers = [], loading = true }) {
  console.log("main screen posts", papers);
  return (
    <div className="Main-Screen">
      {loading && <div className="ghost-components"></div>}

      <h2>Posts This Week</h2>
      <ul>
        {posts.map((post: any) => (
          <li key={post.id}>
            <BlogPostShort post={post} />
          </li>
        ))}
      </ul>

      <h2>Papers This Week</h2>
      <ul>
        {papers.slice(0, 5).map((paper: any, id: number) => (
          <li key={paper.title + id}>
            <PaperShort paper={paper} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MainScreen;
