import React from "react";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import IconButton from "@material-ui/core/IconButton";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";

import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ThumbUp from "@material-ui/icons/ThumbUp";

import MoreVertIcon from "@material-ui/icons/MoreVert";
import { makeStyles } from "@material-ui/core/styles";
import HeroImage from "../hero-image/HeroImage";
import { A } from "hookrouter";

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
  },
  img: {
    backgroundSize: "cover",
    width: "100%",
    height: 300
  }
});

function BlogPostShort({ post }: { post?: any }) {
  const classes = useStyles();
  if (!post) {
    return null;
  }
  return (
    <Card className={classes.card}>
      <CardHeader
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
        title={post.title}
        subheader={post.publishedDate}
      />
      <CardContent>
        <div
          className={classes.img}
          style={{ backgroundImage: `url(${post.heroImage.imageUrl})` }}
        ></div>
        <A href={`/blog/${post.id}`}>{post.description}</A>
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
