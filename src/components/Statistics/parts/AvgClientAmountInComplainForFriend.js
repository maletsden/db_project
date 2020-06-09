import React from "react";
import {makeStyles, useTheme} from "@material-ui/core/styles";
import Title from "../../MainComponent/Title";
import {Label, Line, LineChart, ResponsiveContainer, XAxis, YAxis} from "recharts";
import clsx from "clsx";
import {
  Paper,
  Grid,
  Box,
  Container,
  Button,
  Select,
  Input,
  MenuItem
} from "@material-ui/core";
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
  createClientsData(0, 'Oliver Hansen'),
  createClientsData(1, 'Van Henry'),
  createClientsData(2, 'April Tucker'),
  createClientsData(3, 'Ralph Hubbard'),
  createClientsData(4, 'Omar Alexander')
];

function createClientsData(id, full_name) {
  return {id, full_name};
}


export default function AvgClientAmountInComplainForFriend() {
  const theme = useTheme();
  const classes = useStyles();
  const [clientsList, setClientsList] = React.useState(clientsNames);
  const [clientName, setClientName] = React.useState(clientsList[0]);
  const [chartData, setChartData] = React.useState(data);

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  React.useEffect(() => {
    fetch(`/get-clients`)
      .then(response => response.json())
      .then(clients => {
        setClientsList(clients);
        setClientName(clients[0]);
      })
      .catch(console.error);
  }, []);


  function updateChart() {
    fetch(`/find-average-number-of-clients-complained?X=${clientName}`)
      .then(response => response.json())
      .then(data => setChartData(data))
      .catch(console.error);
  }

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
                  data={chartData}
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
                    defaultValue={clientName.name}
                    onChange={event => setClientName(event.target.value)}
                    input={<Input/>}
                    MenuProps={MenuProps}
                  >
                    {clientsList.map(({full_name, id}) => (
                      <MenuItem key={full_name} value={id} style={getSelectMenuItemsStyles(full_name, clientsList, theme)}>
                        {full_name}
                      </MenuItem>
                    ))}
                  </Select>
                </Box>

                <Box>
                  <Grid item container xs={6} justify={"center"} alignItems={"center"}>
                    <Button variant="outlined" onClick={updateChart}>
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
