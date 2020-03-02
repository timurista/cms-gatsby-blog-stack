import React from "react";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import IconButton from "@material-ui/core/IconButton";
import CardHeader from "@material-ui/core/CardHeader";
import { format } from "date-fns";

import MoreVertIcon from "@material-ui/icons/MoreVert";
import { makeStyles } from "@material-ui/core/styles";
import { A } from "hookrouter";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
// const data = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400}, ...];

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

function pairs(words: Array<string>) {
    const pairs = new Set()
    for (var i = 0; i < words.length - 1; i++) {
        for (var j = i; j < words.length - 1; j++) {
            const curr_word = words[i];
            const next_word= words[j+1]
            let isOk = curr_word.toLowerCase() !== next_word.toLowerCase()
            const badWords = ["this","that"]
            isOk = !badWords.includes(curr_word) && !badWords.includes(next_word)

            if (curr_word.length > 3 && next_word.length > 3 && isOk) {
                pairs.add([words[i], words[j+1]]);
            }
        }
    }
    return Array.from(pairs)
}

function MainResearchPaper({ papers = []}: {papers: Array<any>}) {
  const classes = useStyles();
  if (!papers.length) {
    return null;
  }
  const phrases: any = {}
  papers.forEach(paper => {
      console.log(paper)
    //   debugger;
    const splitText = paper.abstract_text.toLowerCase().split(/\s+/g)
    const bigrams: Array<any> = pairs(splitText.slice(0,100))
    console.log(bigrams)
    for (let bigram of bigrams) {
        if (bigram.length > 1) {
            const key = bigram.join(' ').toLowerCase()
            const foundValue = phrases[key];
            phrases[key] = foundValue ? foundValue + 1 : 1    
        }
    }
    // debugger;
  })
  const data = Object.keys(phrases).filter(phrase => phrases[phrase] > 1).map(phrase => {
      return {
            phrase,
            name: phrase,
            count: phrases[phrase]
        }
  }).sort((a,b) => b.count - a.count).slice(10,30)
  console.log(phrases, data)
  return (
    <Card className={classes.card}>
      <CardContent>
          <h2></h2>
      <LineChart  width={900} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <Line type="monotone" dataKey="count" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="name" />
            <YAxis dataKey="count" />
            <Tooltip labelFormatter={(label: any) => {
                // debugger
                return <span style={{color: "black"}}>{label}</span>
            }} />
        </LineChart>
      </CardContent>
    </Card>
  );
}

export default MainResearchPaper;
