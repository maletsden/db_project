import React from "react";
import AvgClientAmountInComplainForFriend from "./parts/AvgClientAmountInComplainForFriend";
import DaysOffOfFriends from "./parts/DaysOffOfFriends";
import {makeStyles} from "@material-ui/core/styles";
import CommonSelebrations from "./parts/CommonSelebrations";
import Copyright from "../Copyright/Copyright";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  appBarSpacer: theme.mixins.toolbar,
}));

export default function Statistics() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <div className={classes.appBarSpacer}/>
      <DaysOffOfFriends/>
      <Box mb={10}/>
      <AvgClientAmountInComplainForFriend/>
      <Box mb={10}/>
      <CommonSelebrations/>

      <Box pt={4} mb={5}>
        <Copyright/>
      </Box>
    </React.Fragment>
  );
}
