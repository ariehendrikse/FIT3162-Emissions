import { Box, Button, Grid, Paper, List, ListItem, ListItemAvatar, Avatar, ListItemText, Typography, Divider, makeStyles, createStyles, Theme } from "@material-ui/core";
import { Line } from "react-chartjs-2";
import firebase from "firebase";
import React from "react";
import { db } from "../../../firebase/firebase";
import Depot from "../../../model/Depot";
import Trip from "../../../model/Trip";
import User from "../../../model/User";
import Vehicle from "../../../model/Vehicle";
import 'chartjs-adapter-moment';

let example_user: User = {
  name: "Daniel",
  id: "1"
}

let example_depot_a: Depot = {
  current_vehicles: [],
  position: {
    longitude: 100,
    latitude: 100
  }, 
  name: "Depot #6",
  id: "1"
}
let example_depot_b: Depot = {
  current_vehicles: [],
  position: {
    longitude: 100,
    latitude: 100
  },
  name: "Depot #4",
  id: "2"
}
let example_vehicle: Vehicle = {
  make: {name: "Ford"},
  model: {name: "Transit"},
  year: 2021
}
let example_trips: Trip[] = [
  {
    id: "1",
    from: example_depot_a,
    to: example_depot_b,
    co2_grams: 123.7,
    distance: 14524,
    vehicle: example_vehicle,
    driver: example_user,
  }
]

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: '36ch',
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: 'inline',
    },
    paper: {
      textAlign: 'center',
      padding: theme.spacing(2),
      width: 100,
      height: 100
    }
  }),
);

const EmissionsChart = (props: {data: {date: Date, number: Number}[]}) => {
  const data = {
    labels: [
      new Date(86400000), // Day 1
      new Date(2 * 86400000), // Day 2
      new Date(3 * 86400000), // Day 3
      new Date(4 * 86400000), // Day 4
      new Date(6 * 86400000), // Day 6
      new Date(7 * 86400000), // Day 7
      new Date(13 * 86400000), // Day 13
    ],
    datasets: [
      {
        label: "Emissions",
        data: [1, 3, 4, 5, 6, 7, 8],
      },
    ],
  };
  
  const options = {
    scales: {
      x: {
        type: "time",
      }
    },
  }
  return <Line data={data} options={options} />
}

const TripHistory = () => {
  const classes = useStyles()
  const tripListItem = (trip: Trip) => {
    return <ListItem alignItems="flex-start" button>
      <ListItemAvatar>
        <Avatar alt={trip.driver.name} src="/static/images/avatar/1.jpg" />
      </ListItemAvatar>

      <ListItemText
        primary={`${trip.from.name} to ${trip.to.name}`}
        secondary={
          <React.Fragment>
            <Typography
              component="span"
              variant="body2"
              className={classes.inline}
              color="textPrimary"
            >
              {(trip.distance / 1000).toFixed(2)}km
            </Typography>
             - {`${trip.co2_grams}g of CO2`}
          </React.Fragment>
        }
      />
    </ListItem>
  }
  return <Paper style={{height: '100%'}}>
    <Box textAlign='center'>
      <Typography variant='h5'>Trip History</Typography>
    </Box>
    <List className={classes.root}>
      {example_trips.map(tripListItem)}
    </List>
  </Paper>
}

const EmissionsDashboard = () => {
  const classes = useStyles();

<<<<<<< HEAD
=======
  

>>>>>>> ed6908a937c891badedbbce0f624c6a701af5a39
  return <div>
  <Box height="90vh">
    <Grid container style={{paddingTop: 30, paddingLeft:  30, height: 'calc(100vh - 150px)', width: '100vw'}} spacing={8}  >
      <Grid item xs={3}>
        <TripHistory />
      </Grid>
      <Grid container item xs={9} direction='column'>
        <Grid item xs={12}>
          <Paper>
            <EmissionsChart data={[]}/>
          </Paper>
        </Grid>
        <Grid item xs={2}>
          <Box style={{flexGrow: 1}} flexDirection='column'>
            <Paper className={classes.paper} >
              
              1.32g CO2
              
            </Paper>
            <Paper className={classes.paper} >
              
              1.32g CO2
              
            </Paper>
            <Paper className={classes.paper} >
              
              1.32g CO2
              
            </Paper>
            <Paper className={classes.paper} >
              
              1.32g CO2
              
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  </Box>

 
  
  </div>
}

export default EmissionsDashboard