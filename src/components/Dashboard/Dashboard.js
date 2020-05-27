import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import React from "react";
import clsx from "clsx";
import {makeStyles} from "@material-ui/core/styles";
import Chart from "./Chart";
import RecentActivities from "./RecentActivities";
import Copyright from "../Copyright/Copyright";
import TotalRentShower from "./TotalRentShower";


const useStyles = makeStyles((theme) => ({
  appBarSpacer: theme.mixins.toolbar,

  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  fetch('/test')
    .then(response => response.json())
    .then(data => console.log(data));

  return (
    <div>
      <div className={classes.appBarSpacer}/>
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={3}>
          {/* Chart */}
          <Grid item xs={12} md={8} lg={9}>
            <Paper className={fixedHeightPaper}>
              <Chart />
            </Paper>
          </Grid>
          {/* Recent Deposits */}
          <Grid item xs={12} md={4} lg={3}>
            <Paper className={fixedHeightPaper}>
              <TotalRentShower />
            </Paper>
          </Grid>
          {/* Recent RecentActivities */}
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <RecentActivities />
            </Paper>
          </Grid>
        </Grid>
        <Box pt={4}>
          <Copyright />
        </Box>
      </Container>
    </div>
  );
}
