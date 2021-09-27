import React, { Component } from "react";
import { Box, Button, IconButton, Table, Toolbar, Typography } from "@material-ui/core";
import { Menu , ChevronRight } from "@material-ui/icons";
import MapComponent from '../vehicle-routing/map'
// import { Button } from '@material-ui/core';
import MainAppBar from "./AppBar";
import {
  HashRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

// import {Line} from 'react-chartjs-2';
import ReactDOM from "react-dom";
import {useState} from 'react'
import NavMenu from "./NavMenu";
import EmissionsDashboard from "../emissions/EmissionsDashboard";
import { FleetDashboard } from "../fleet/FleetDashboard";

// import {ZoomChart} from "./components/ZoomChart";
// import { ApexChart } from "./components/ApexChart";


const PageRouting = () => {

  return (
    <Box> 
      <MainAppBar />
        <Box pt={6.5} height={'calc(100vh - 20px)'}>
          <Router>
            {/* A <Switch> looks through its children <Route>s and
                renders the first one that matches the current URL. */}
            <Switch>
              {/* <Route path="/about">
                <About />
              </Route> */}
              <Route path="/emissions">
                <EmissionsDashboard />
              </Route>
              <Route path="/route">
                <MapComponent /> 
              </Route>
              <Route path="/fleet">
                <FleetDashboard />
              </Route>
              <Route path="/infrastructure">
                <div></div>
              </Route>
              <Route path="/">
                <NavMenu />
              </Route>
            </Switch>
        </Router>
      </Box>
    </Box>
  );

} 

export default PageRouting