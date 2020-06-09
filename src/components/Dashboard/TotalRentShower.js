import React from 'react';
import Typography from '@material-ui/core/Typography';
import Title from '../MainComponent/Title';
import {getTodayStandard} from "../../helpers/dataHelperFunctions";
import {connect} from "react-redux";
import {getUser} from "../../reducers/index";


function TotalRentShower({user}) {
  const [totalRents, setTotalRents] = React.useState(0);

  fetch(`/get-user-total-rents?user_id=${user.id}`)
    .then(response => response.json())
    .then(rentsNum => setTotalRents(rentsNum))
    .catch(console.error);

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

const mapStateToProps = state => ({
  user: getUser(state)
});

export default connect(mapStateToProps)(TotalRentShower);