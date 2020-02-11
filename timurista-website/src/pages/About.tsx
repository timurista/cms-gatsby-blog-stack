import React from "react";
import { Paper, Grid, Typography, Box } from "@material-ui/core";
import {makeStyles } from '@material-ui/core/styles';

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
      <p>
      <Typography variant="body1">
        I am a software engineer working in Silicon valley on cloud infrastrcuture and scalable models.
      </Typography>
      </p>
    </Paper>
    </Grid>
  </Box>;
}

export default About;
