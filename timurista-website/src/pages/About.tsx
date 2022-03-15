import React from "react";
import { Paper, Grid, Typography, Box, Link } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Testimonials from "../components/testimonials/Testimonials";

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.background.paper,
    color: theme.palette.getContrastText(theme.palette.background.paper),
    border: 0,
    fontSize: 16,
    borderRadius: 3,
    marginTop: 60,
    boxShadow: "none",
    minHeight: "400px",
    padding: theme.spacing(2),
    typography: {
      marginBottom: theme.spacing(2),
    },
  },
  divider: {
    margin: 20,
  },
  link: {
    color: theme.palette.primary.light,
  },
}));

function About() {
  const classes = useStyles();
  return (
    <Box maxWidth="1024px" margin="0 auto">
      <Grid container>
        <Paper className={classes.root}>
          <Typography variant="h3" gutterBottom>
            How was this site built?
          </Typography>

          <Typography variant="body1" gutterBottom>
            This site is rebuilt daily and automatically using a lambda cron job
            that crawls{" "}
            <Link href="https://arxiv.org/list/cs.AI/recent">
              Cornell University Publications
            </Link>
            . During the night a papers.json file is compiled from a lambda job
            running against the cornell website that stores various papers for
            free on machine learning, ai. It parses the latest papers in pdf and
            does basic text recognition to find the summary of the article and
            paste it in code. It also embdeds the article in an iframe so you
            can read it on the website. Another lambda is also run which crawls
            medium articles on the subject of machine learning and AI. It also
            filters out duplicates and does some basic sanitzation of the
            content to make sure garbage is not returned. Then it creates a
            small list of json files. Because the s3 bucket is versioned, we
            have a history of the articles back several versions. But since
            there is no db, we don't store the articles instead users are
            required to go to the medium website or cornell to read the full
            files. This site is meant to be a daily digest. To get the state of
            ML in the industry.
            <br />
            <br />
            Once the s3 bucket is updated (there's a trigger connected to the
            bucket), CloudFront watches the s3 bucket for changes to the
            papers.json or articles.json. Once a new version is detected, it
            invalidates the cache and serves the new version from the static s3
            bucket. Essentially the cloudfront distribution is an
            always-up-to-date cache of medium articles and papers on ai research
            pulled from the web.
          </Typography>

          <hr className={classes.divider} />

          <Typography variant="h3" gutterBottom>
            Who am I?
          </Typography>

          <Typography variant="body1" gutterBottom>
            I am a software engineer with a passion for building things that
            people love. I have a background in education and work on
            Kubernetes, Infrastructure, building cool experiences. See my
            <Link href="https://www.linkedin.com/in/timothyurista/">
              {" "}
              LinkedIn{" "}
            </Link>
            for more details of work I have done in the past.
          </Typography>

          <Typography variant="h3">Clients I have worked for</Typography>

          <Box marginBottom={8} marginTop={8}>
            <Testimonials />
          </Box>

          <Typography variant="h3">Companies I have worked at</Typography>
          <Box marginBottom={8} marginTop={2}>
            <Box flex="stretch">
              <ul
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr",
                  gridGap: "20px",
                  textAlign: "center",
                  alignContent: "center",
                  alignItems: "center",
                }}
              >
                <li>
                  <img width="16px" height="16px" src="/images/roku.png"></img>{" "}
                  Roku
                </li>
                <li>
                  <img
                    width="16px"
                    height="16px"
                    src="/images/facebook.png"
                  ></img>{" "}
                  Facebook
                </li>
                <li>Aerion</li>
                <li>Iterate AI</li>
                <li>Healthtrio</li>
                <li>Weedmaps</li>
              </ul>
            </Box>
          </Box>

          <Typography variant="h3">Mobile and Website Development</Typography>
          <Box marginBottom={8} marginTop={8}>
            <img src="/images/timrusitaAppScreenshot.png" height={800} />
          </Box>

          <Typography variant="h3">Want to Collaborate?</Typography>
          <Box marginBottom={8} marginTop={2}>
            <Link
              className={classes.link}
              href="https://join.slack.com/t/timuristafree-2jp8453/shared_invite/zt-cwsbotut-gEo2hrqF7qGEFt9r9~_SSQ"
            >
              Join the Slack channel and get an estimate today!
            </Link>
          </Box>
        </Paper>
      </Grid>
    </Box>
  );
}

export default About;
