import {makeStyles, useTheme} from "@material-ui/core/styles";
import React from "react";
import Title from "../../MainComponent/Title";
import {Label, Line, LineChart, ResponsiveContainer, XAxis, YAxis} from "recharts";
import clsx from "clsx";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Chart from "../../Dashboard/Chart";
import Deposits from "../../Dashboard/Deposits";
import Orders from "../../Dashboard/Orders";
import Box from "@material-ui/core/Box";
import Copyright from "../../Copyright/Copyright";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import {getTodayDataFormatted} from "../../../helpers/dataHelperFunctions";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import {getSelectMenuItemsStyles, MenuProps} from "../../../helpers/selectHelperFunctions";

function createData(month, amount) {
  return {month, amount};
}

const data = [
  createData('January', 8),
  createData('February', 5),
  createData('March', 4),
  createData('April', 2),
  createData('May', 10),
  createData('June', 7),
  createData('July', 6),
  createData('August', 9),
  createData('September', 5),
  createData('October', 5),
  createData('November', 7),
  createData('December', 4),
];
const useStyles = makeStyles((theme) => ({
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

const clientsNames = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];


export default function AvgClientAmountInComplainForFriend() {
  const theme = useTheme();
  const classes = useStyles();
  const [clientName, setClientName] = React.useState(clientsNames[0]);

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <React.Fragment>
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={3}>
          {/* Chart */}
          <Grid item xs={12} md={8} lg={9}>
            <Paper className={fixedHeightPaper}>
              <Title>
                <Box ml={2}>
                  Average amount of client in the group that was complaining for the client
                </Box>
              </Title>
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
                      Average clients amount
                    </Label>
                  </YAxis>
                  <Line type="monotone" dataKey="amount" stroke={theme.palette.primary.main} dot={false}/>
                </LineChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
          {/* Recent Deposits */}
          <Grid item xs={12} md={4} lg={3}>

            <Paper className={fixedHeightPaper}>
              <Grid container style={{
                height: '100%'
              }} direction={"column"} justify={"space-between"}>
                <Title>
                  Selected client:
                </Title>
                <Box ml={2}>
                  <Select
                    labelId="client-select-label"
                    defaultValue={clientName}
                    onChange={event => setClientName(event.target.value)}
                    input={<Input/>}
                    MenuProps={MenuProps}
                  >
                    {clientsNames.map(name => (
                      <MenuItem key={name} value={name} style={getSelectMenuItemsStyles(name, clientsNames, theme)}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </Box>

                <Box>
                  <Grid item container xs={6} justify={"center"} alignItems={"center"}>
                    <Button variant="outlined">
                      Apply
                    </Button>
                  </Grid>
                </Box>

              </Grid>
            </Paper>


          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
}
