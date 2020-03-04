import React from "react";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";

import { makeStyles } from "@material-ui/core/styles";
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
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
            let isOk = curr_word.toLowerCase() != next_word.toLowerCase()
            const badWords = ["this","that", "where", "with"]
            isOk = isOk && !badWords.includes(curr_word) && !badWords.includes(next_word)

            if (curr_word.length > 3 && next_word.length > 3) {
                if (isOk) {
                  pairs.add([curr_word, next_word]);
                }
            }
        }
    }
    return Array.from(pairs)
}

function getData(papers: any) {
  const phrases: any = {}
  papers.forEach((paper: any) => {
    //   debugger;
    const splitText = paper.abstract_text.toLowerCase().split(/\s+/g)
    const bigrams: Array<any> = pairs(splitText.slice(0,100))
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
            value: phrases[phrase]
        }
  }).sort((a,b) => b.value - a.value).slice(1,15)
  // console.log(phrases, data)
  return data
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
	cx, cy, midAngle, innerRadius, outerRadius, percent, index, value, name, ...extra
}: any) => {
	const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
	const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  // const x_2 = cx + radius * Math.cos(-midAngle * RADIAN);
  // const y_2 = cy + radius * Math.sin(-midAngle * RADIAN);
  
  // console.log('percent', percent)
	return (
    <>
    <text x={extra.x} y={extra.y} fill="white" dominantBaseline="central" textAnchor={x > cx ? 'start' : 'end'}>
      {name}
    </text>
		<text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">      
			{`${(percent * 100).toFixed(0)}%`}
		</text>
    </>
	);
};

// export function DataPieChart({ data }: { data: any}) {
export class DataPieChart extends React.PureComponent<{data: any}> {
  render() {
    const { data } = this.props;
		return (
			<PieChart width={960} height={600}>
				<Pie
					data={data}
					cx={480}
					cy={300}
					labelLine={false}
					label={renderCustomizedLabel}
          fill="#8884d8"
          outerRadius={190}
          isAnimationActive={false} 
					dataKey="value"
				>
					{
						data.map((entry: any, index: number) => <Cell  key={`cell-${index}`} fill={COLORS[index % COLORS.length]}>{entry.name}</Cell>)
					}
				</Pie>
        <Tooltip />
			</PieChart>
    );
  }
}


function MainResearchPaper({ papers = []}: {papers: Array<any>}) {
  const classes = useStyles();
  if (!papers.length) {
    return null;
  }
  const data = getData(papers)
  console.log(data)
  return (
    <Card className={classes.card}>
      <CardContent>
        <DataPieChart data={data} />
      </CardContent>
    </Card>
  );
}

export default MainResearchPaper;
