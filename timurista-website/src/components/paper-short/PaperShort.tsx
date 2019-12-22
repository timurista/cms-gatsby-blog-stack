import React from "react";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import IconButton from "@material-ui/core/IconButton";
import CardHeader from "@material-ui/core/CardHeader";
import { format } from "date-fns";

import MoreVertIcon from "@material-ui/icons/MoreVert";
import { makeStyles } from "@material-ui/core/styles";
import { A } from "hookrouter";
// import PDFDocumentIcon from "./PDFDocumentIcon";

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
  link: {
    color: "aqua",
    textDecoration: "none"
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

function PaperShort({ paper }: { paper?: any }) {
  const classes = useStyles();
  const blogIdUri = encodeURI(paper.title);
  if (!paper) {
    return null;
  }
  return (
    <Card className={classes.card}>
      <CardHeader
        className={classes.cardheader}
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={
          <A className={classes.title} href={`/paper/${blogIdUri}`}>
            {paper.title}
          </A>
        }
        subheader={
          <div className={classes.subheader}>
            {format(new Date(paper.submission_date), "MMM d, yyyy")}{" "}
            <a href={paper.pdf_link}>
              <span role="img" aria-label="jsx-a11y/accessible-emoji">
                📁
              </span>
            </a>
          </div>
        }
      />
      <CardContent>
        <p>
          {paper.abstract_text.slice(0, 250) + " "}
          <span>
            <A className={classes.link} href={`/paper/${blogIdUri}`}>
              >>
            </A>
          </span>
        </p>

        <div className={classes.description}>
          Authors: {paper.authors.join(", ")}
        </div>
      </CardContent>
    </Card>
  );
}

export default PaperShort;
