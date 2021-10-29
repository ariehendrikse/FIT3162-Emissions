import { Box } from "@material-ui/core";

import LocationSearchInput from "../vehicle-routing/autofill";
import MapWithADirectionsRenderer from "../vehicle-routing/map";
import MainAppBar from "./AppBar";
import {
  HashRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import NavMenu from "./NavMenu";
import EmissionsDashboard from "../emissions/EmissionsDashboard";
import { FleetDashboard } from "../fleet/FleetDashboard";
import { InfrastructureDashboard } from "../infrastructure/InfrastructureDashboard";



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

                <MapWithADirectionsRenderer/>


              </Route>
              <Route path="/fleet">
                <FleetDashboard />
              </Route>
              <Route path="/infrastructure">
                <InfrastructureDashboard />
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