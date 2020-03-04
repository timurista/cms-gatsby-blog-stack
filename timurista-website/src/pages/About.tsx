import React from "react";
import { Paper, Grid, Typography, Box } from "@material-ui/core";
import {makeStyles } from '@material-ui/core/styles';
import Testimonials from "../components/testimonials/Testimonials"

const useStyles = makeStyles(theme => ({
  root: {
    background: theme.palette.background.paper,
    color: theme.palette.getContrastText(theme.palette.background.paper),
    border: 0,
    fontSize: 16,
    borderRadius: 3,
    marginTop: 60,
    boxShadow: 'none',
    minHeight: '400px',
    padding: theme.spacing(2),
  },
}));

function About() {
  const classes= useStyles();
  return <Box height="100vh">
    <Grid container>
      <Paper className={classes.root}>
      <Typography variant="h3">About</Typography>
        <Typography variant="body1">
          Ex-Facebook, Software Engineer at Roku.
        </Typography>

        <Testimonials />

      
      <Typography variant="h3">Expert</Typography>
      <p>
        * UI/UX react, angular, javascript
        * devops, AWS
        * Machine learning, python
      {/* <Expertise /> */}
      </p>
    </Paper>
    </Grid>
  </Box>;
}

export default About;
