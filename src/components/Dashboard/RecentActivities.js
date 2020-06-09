import React from 'react';
import ListItems from "../ListIItems/ListItems";
import {getUser} from "../../reducers";
import {connect} from "react-redux";

const celebrationsLabels = [
  'Date',
  'Type',
  'Address',
  'Style',
];

const celebrationsColKeys = [
  'date',
  'type',
  'address',
  'style'
];


function createData(id, type, address, style, date) {
  return {id, type, address, style, date};
}


const celebrationsRows = [
  createData(0,'garden', '68826 Dietrich Ridges', 'Military', '1978-12-07'),
  createData(1, 'open area', '20552 Monty Meadow Apt. 416', 'Mexican', '2000-08-21'),
  createData(2, 'garden', '2045 Cesar Trail Suite 658', 'Neighborhood', '1977-01-03'),
  createData(3, 'open area', '98662 Aufderhar Dam Apt. 749', 'Pajama Party', '1982-04-16')
];

function RecentActivities({user}) {
  const [activitiesList, setActivitiesList] = React.useState(celebrationsRows);

  fetch(`/get-recent-activities?user_id=${user.id}`)
    .then(response => response.json())
    .then(list => setActivitiesList(list))
    .catch(console.error);

  return (
    <ListItems rows={activitiesList} labels={celebrationsLabels} col_keys={celebrationsColKeys} title="Recent Celebrations"/>
  );
}

const mapStateToProps = state => ({
  user: getUser(state)
});

export default connect(mapStateToProps)(RecentActivities);