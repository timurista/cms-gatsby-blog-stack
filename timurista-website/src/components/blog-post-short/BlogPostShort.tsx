import React from "react";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import IconButton from "@material-ui/core/IconButton";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import { format } from "date-fns";

import ShareIcon from "@material-ui/icons/Share";
import ThumbUp from "@material-ui/icons/ThumbUp";

import MoreVertIcon from "@material-ui/icons/MoreVert";
import { makeStyles } from "@material-ui/core/styles";
import { A } from "hookrouter";

const useStyles = makeStyles({
  card: {
    minWidth: 275,
    margin: "0 auto",
    //   maxWidth: 500,
    background: "rgb(84,84,84)",
    //   background: "rgb(35,35,35)",
    //   border: "1px solid white",
    //   color: "white",
    //   background: "rgba(33,33,33,1.0)",
    color: "white"
  },
  description: {
    color: "white",
    padding: "16px 8px",
    fontSize: 16
  },
  avatar: {
    backgroundColor: "#BB86FC",
    color: "black"
  },
  cardheader: {
    color: "white",
    textDecoration: "none"
  },
  subheader: {
    color: "rgb(156,156,156)"
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 18,
    color: "white",
    textDecoration: "none"
  },
  pos: {
    marginBottom: 12
  },
  img: {
    backgroundSize: "cover",
    width: "100%",
    height: 300
  }
});

function BlogPostShort({ post }: { post?: any }) {
  const classes = useStyles();
  const blogIdUri = encodeURI(post.slug);
  if (!post) {
    return null;
  }
  return (
    <Card className={classes.card}>
      <CardHeader
        className={classes.cardheader}
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {post.author &&
              post.author.name
                .split(" ")
                .map((n: String) => n.toUpperCase().charAt(0))
                .join("")}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={
          <A className={classes.title} href={`/blog/${blogIdUri}`}>
            {post.title}
          </A>
        }
        subheader={
          <div className={classes.subheader}>
            {format(new Date(post.publishedDate), "MMM d, yyyy")}
          </div>
        }
      />
      <CardContent>
        <a href={`${post.link}`}>
          <div
            className={classes.img}
            style={{ backgroundImage: `url(${post.heroImage.imageUrl})` }}
          ></div>
        </a>
        <div className={classes.description}>{post.description}</div>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="learn more">
          <ThumbUp />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default BlogPostShort;
