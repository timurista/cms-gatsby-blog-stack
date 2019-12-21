import React from "react";
import { Post } from "../../store/BlogStore";
import "./BlogPost.scss";
import Iframe from "react-iframe";
// import ReactMarkdown from "react-markdown";
// import SidebarActions from "../sidebar-actions/SideBarActions";
import "@fortawesome/fontawesome-free/css/all.css";

export interface BlogPostProps {
  post: Post;
}

function BlogPost({ post }: BlogPostProps) {
  //   console.log("post", post);
  return (
    <div className="Blog-Post">
      <div className="hero-image">
        <picture>
          <img
            alt={post.heroImage.title}
            src={post.heroImage.imageUrl || ""}
          ></img>
        </picture>
        <div className="overlay"></div>
      </div>

      {process.env.NODE_ENV === "development" && (
        <div>
          <Iframe
            url="https://arxiv.org/pdf/1912.05935.pdf#zoom=125"
            width="100%"
            height="500px"
            id="pdf-object"
            className="pdf-iframe"
            display="block"
            position="relative"
          />
        </div>
      )}

      <div className="contents">
        <h1 id="article-header">{post.title}</h1>

        <div>
          {/* <SidebarActions author={post.author} /> */}
          <div dangerouslySetInnerHTML={{ __html: post.body || "" }} />
          {/* <ReactMarkdown source={post.body || ""} /> */}
        </div>
      </div>
    </div>
  );
}
export default BlogPost;
