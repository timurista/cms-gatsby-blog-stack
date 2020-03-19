import React from "react";
import { Paper, Grid, Typography, Box, Link } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Testimonials from "../components/testimonials/Testimonials";

const useStyles = makeStyles(theme => ({
  root: {
    background: theme.palette.background.paper,
    color: theme.palette.getContrastText(theme.palette.background.paper),
    border: 0,
    fontSize: 16,
    borderRadius: 3,
    marginTop: 60,
    boxShadow: "none",
    minHeight: "400px",
    padding: theme.spacing(2)
  },
  divider: {
    margin: 20
  },
  link: {
    color: theme.palette.primary.light
  }
}));

function About() {
  const classes = useStyles();
  return (
    <Box>
      <Grid container>
        <Paper className={classes.root}>
          <Typography variant="h3">Proven results</Typography>

          <Box marginBottom={8} marginTop={8}>
            <Testimonials />
          </Box>

          <Typography variant="h3">Proven Track Record</Typography>
          <Box marginBottom={8} marginTop={2}>
            <Box display="flex" justifyContent="space-evenly">
              <Box flex="stretch">
                <h4>Big names</h4>
                <ul>
                  <li>Roku</li>
                  <li>Facebook</li>
                </ul>
              </Box>

              <Box flex="stretch">
                <h4>Start ups</h4>
                <ul>
                  <li>Aerion</li>
                  <li>Iterate AI</li>
                </ul>
              </Box>

              <Box flex="stretch">
                <h4>Health Industry</h4>
                <ul>
                  <li>Healthtrio</li>
                  <li>Weedmaps</li>
                </ul>
              </Box>
            </Box>

          </Box>

          <Typography variant="h3">Mobile and Website Development</Typography>
          <Box marginBottom={8} marginTop={8}>
            <img src="/images/timrusitaAppScreenshot.png" height={800} />
          </Box>

          <Typography variant="h3">Ready to get work done?</Typography>
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
