import React from 'react';
import Typography from '@material-ui/core/Typography';
import Title from '../MainComponent/Title';
import {getTodayStandard} from "../../helpers/dataHelperFunctions";


const totalRents = 454323;
export default function TotalRentShower() {
  return (
    <React.Fragment>
      <Title>Total Rents</Title>
      <Typography component="p" variant="h4">
        {totalRents}
      </Typography>
      <Typography color="textSecondary">
        on {getTodayStandard()}
      </Typography>
    </React.Fragment>
  );
}