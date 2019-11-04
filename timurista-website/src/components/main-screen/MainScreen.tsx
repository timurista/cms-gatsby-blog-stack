import React from "react";
import "./MainScreen.scss";
import BlogPostShort from "../blog-post-short/BlogPostShort";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  card: {
    minWidth: 275,
    //   maxWidth: 500,
    background: "rgb(222,222,222)"
    //   background: "rgb(35,35,35)",
    //   border: "1px solid white",
    //   color: "white",
    //   background: "rgba(33,33,33,1.0)",
    //   color: 'white',
  },
  avatar: {
    backgroundColor: "red"
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
});

function MainScreen({ posts = [] }) {
  const classes = useStyles();
  return (
    <div className="Main-Screen">
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
