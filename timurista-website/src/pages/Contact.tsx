import React from "react";
import { observer, inject } from "mobx-react";
import { BlogStore } from "../store/BlogStore";
import MainScreen from "../components/main-screen/MainScreen";
import get from "lodash.get";
import { useStyles } from "./Styles";
import { Paper, Grid, Typography, Box, Link } from "@material-ui/core";

function ContactPage() {
  const classes = useStyles();
  const auth = false;
  return (
    <Box maxWidth="1024px" margin="0 auto">
      <Grid container>
        <Paper className={classes.root}>
          <Typography variant="h2" gutterBottom>
            Would you like to join Mastermind Group?
          </Typography>

          <Box maxWidth="680px" minWidth="200px" margin="0 auto">
            <img
              width=""
              src="https://images.pexels.com/photos/260024/pexels-photo-260024.jpeg?cs=srgb&dl=pexels-pixabay-260024.jpg&fm=jpg"
            />

            <p>
              Mastermind Group is a group of people who are passionate about the
              development of the web. We are a group of developers who are eager
              to learn and grow. Joining this group will help you make personal
              and professional connections to help you along your journey.
            </p>
          </Box>

          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSeIflTz1K5-SB8nbSBCTz7BRhhi7u_EmLwC_bcpW7e3U9t3Og/viewform?embedded=true"
            width="600"
            height="1024"
            frameBorder="0"
            scrolling="no"
          >
            Loading…
          </iframe>
        </Paper>
      </Grid>
    </Box>
  );
}

const injectedHomePage = inject("authStore")(observer(ContactPage));

export default injectedHomePage;
