import React from 'react';
import {useTheme} from '@material-ui/core/styles';
import {LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer} from 'recharts';
import Title from '../MainComponent/Title';

// Generate Sales Data
function createData(month, amount) {
  return {month, amount};
}

// function getLast12Months() {
//   const theMonths = [
//     "January", "February", "March",
//     "April", "May", "June", "July",
//     "August", "September", "October",
//     "November", "December"
//   ];
//   let last12Months = new Array(12);
//   const today = new Date();
//   let aMonth = today.getMonth();
//
//   for (let i = 0; i < 12; i++) {
//     last12Months[11 - i] = theMonths[aMonth--];
//     if (aMonth < 0) aMonth = 11;
//   }
//   return last12Months;
// }

const data = [
  createData('January', 12),
  createData('February', 231),
  createData('March', 545),
  createData('April', 332),
  createData('May', 223),
  createData('June', 627),
  createData('July', 323),
  createData('August', 233),
  createData('September', 132),
  createData('October', 232),
  createData('November', 445),
  createData('December', 123),
];

export default function Chart() {
  const theme = useTheme();

  return (
    <React.Fragment>
      <Title>Total rents by last 12 months</Title>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis dataKey="month" stroke={theme.palette.text.secondary}/>
          <YAxis stroke={theme.palette.text.secondary}>
            <Label
              angle={270}
              position="left"
              style={{textAnchor: 'middle', fill: theme.palette.text.primary}}
            >
              Total rents
            </Label>
          </YAxis>
          <Line type="monotone" dataKey="amount" stroke={theme.palette.primary.main} dot={false}/>
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}