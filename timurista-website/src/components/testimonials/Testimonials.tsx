import React from "react";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import IconButton from "@material-ui/core/IconButton";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";

import { format } from "date-fns";

// @ts-ignore
import Carousel from 'react-material-ui-carousel'
// import { Carousel } from 'react-responsive-carousel';


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
  quote: {
    color: "white",
    padding: "16px 8px",
    fontSize: 22,
    minHeight: 250,
    display: "flex",
    alignItems: "center"
  },
  attr: {
    fontSize: 16,
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  quoteIcon: {
    fontSize: 40,
    color: "white",
    fontWeight: 700
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
  name: {
    marginRight: 8,
  },
  img: {
    backgroundSize: "cover",
    width: "100%",
    height: 300
  }
});

function Testimonial({ testimonial }: { testimonial?: any }) {
  const classes = useStyles();
  // if (!testimonial) {
  //   return null;
  // }
  console.log('testimonial', testimonial)
  return (
    <Card className={classes.card}>      
      <CardContent>
        <blockquote className={classes.quote}>
        <div className={classes.quoteIcon}>“</div>{testimonial.statement}<div className={classes.quoteIcon}>”</div>
        </blockquote>
        <div className={classes.attr}>
            <span className={classes.name}>{testimonial.name}</span> <Avatar src={testimonial.image} />
        </div>
      </CardContent>
    </Card>
  );
}

export function Testimonials() {
    const testimonials = require('./statements.json')
    console.log(testimonials)
    return (
        <Carousel animation="slide" autoPlay >
            {testimonials.map((testimonial: any) => (
              <div key={testimonial.name}>
                <Testimonial testimonial={testimonial} />
              </div>
            ))}
        </Carousel>
    )
}


export default Testimonials;
