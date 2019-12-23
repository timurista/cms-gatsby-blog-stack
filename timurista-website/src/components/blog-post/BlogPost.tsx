import React from "react";
import { Post } from "../../store/BlogStore";
import "./BlogPost.scss";
// import ReactMarkdown from "react-markdown";
// import SidebarActions from "../sidebar-actions/SideBarActions";
import "@fortawesome/fontawesome-free/css/all.css";

export interface BlogPostProps {
  post: Post;
}

function BlogPost({ post }: BlogPostProps) {
  console.log("POST", post);
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

      <div className="contents">
        {/* <h1 id="article-header">{post.title}</h1> */}

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
