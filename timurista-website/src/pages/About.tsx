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
  divider: {
    margin: 20
  }
}));

function About() {
  const classes= useStyles();
  return <Box>
    <Grid container>
      <Paper className={classes.root}>
      <Typography variant="h3">Proven results</Typography>

      <Box marginBottom={8} marginTop={8}>
        <Testimonials />
      </Box>


      <Typography variant="h3">Solutions for your size</Typography>
        <Box marginBottom={8} marginTop={8}>
          * Serverless microsites
          * SPA blogs
          * Full end to end Solutions
          * Devops Support
        </Box>

        
        <Typography variant="h3">Previous Work</Typography>
        <Box marginBottom={8} marginTop={8}>
          Ex-Facebook, Software Engineer at Roku.          
        </Box>
      

    </Paper>
    </Grid>
  </Box>;
}

export default About;
