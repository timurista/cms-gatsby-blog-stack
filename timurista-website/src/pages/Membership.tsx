import React from "react";
import { observer, inject } from "mobx-react";
import { BlogStore } from "../store/BlogStore";
import MainScreen from "../components/main-screen/MainScreen";
import get from "lodash.get";
import { useStyles } from "./Styles";
import { Paper, Grid, Typography, Box, Link } from "@material-ui/core";

function MembershipPage() {
  const classes = useStyles();
  const auth = false;
  return (
    <Box>
      <Grid container>
        <Paper className={classes.root}>
          <Typography variant="h2">
            Would you like to join Mastermind Group?
          </Typography>

          <Paper>
            <img src="https://images.pexels.com/photos/260024/pexels-photo-260024.jpeg?cs=srgb&dl=pexels-pixabay-260024.jpg&fm=jpg" />
          </Paper>

          <p>
            Mastermind Group is a group of people who are passionate about the
            development of the web. We are a group of developers who are eager
            to learn and grow. Joining this group will help you make personal
            and professional connections to help you along your journey.
          </p>

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

const injectedHomePage = inject("authStore")(observer(MembershipPage));

export default injectedHomePage;
