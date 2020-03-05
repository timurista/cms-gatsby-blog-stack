import React from "react";
import { Paper } from "../../store/BlogStore";
import "../blog-post/BlogPost.scss";
import Iframe from "react-iframe";
// import ReactMarkdown from "react-markdown";
// import SidebarActions from "../sidebar-actions/SideBarActions";
import "@fortawesome/fontawesome-free/css/all.css";

export interface IPaperLong {
  paper: Paper;
}

function PaperLong({ paper }: IPaperLong) {
  //   console.log("post", post);
  return (
    <div className="Blog-Post">
      <div className="contents" >
        <h1 id="article-header">{paper.title}</h1>        
          <div dangerouslySetInnerHTML={{ __html: paper.abstract || "" }} />
        </div>
        <div style={{ marginBottom: 8}}>
          Read full paper:
          <a href={paper.pdf_link}>
              <span role="img" aria-label="jsx-a11y/accessible-emoji">
                📁
              </span>
            </a>
        </div>
        <div>
        <Iframe
          url={
            "http://docs.google.com/viewer?url=" +
            paper.pdf_link +
            "&embedded=true"
          }
          width="100%"
          height="500px"
          id="pdf-object"
          className="pdf-iframe"
          display="block"
          position="relative"
        />
      </div>
    </div>
  );
}
export default PaperLong;
