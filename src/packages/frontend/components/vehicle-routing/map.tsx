import React from "react";
import * as mpg from "../../../logic/mpg";
import { HasEmissions } from "../../../logic/mpg";
import Vehicle from "../../../model/Vehicle";
import {CO2Profile} from "../../../model/Vehicle";

const { compose, withProps, lifecycle } = require("recompose");
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer,
} = require("react-google-maps");

let testVehicle: Vehicle[] = [{
  make: "Toyota",
  model: "Camry",
  year: "1999",
  co2_profile: {highway: 50, combined: 30, urban: 80, co2: 30}
}];

const MapWithADirectionsRenderer = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyBatkKtQkdIob7Ss41D80JYIdUkiT0fH2o&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `800px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap,
  lifecycle({
    componentDidMount() {
      const DirectionsService = new google.maps.DirectionsService();

    //   let coords = [];
    // let waypoints = [];
      // places.map((place) => coords.push({ lat: place.lat, lng: place.lng }));

      DirectionsService.route({
        origin: new google.maps.LatLng(-37.8774, 145.0450),
        destination: new google.maps.LatLng(-37.9144, 145.1300),
        provideRouteAlternatives: true,
        travelMode: google.maps.TravelMode.DRIVING,
      }, (result, status) => {
        // Updated to display multiple routes concurrently
        if (status === google.maps.DirectionsStatus.OK) {
          this.setState({
            directions: result,
            
          });
          // const routes = result.routes
          if (result ) {
          const emissions: HasEmissions = mpg.optimalPathEmissions(result.routes, testVehicle )
          console.log(emissions.emissions)
          }
        } else {
          console.error(`error fetching directions ${result}`);
        }
      });
    }
  })
)((props: { directions: any; }) =>
  <GoogleMap
    defaultZoom={7}
    defaultCenter={new google.maps.LatLng(-37.8774, 145.0450)}
  >
    {props.directions && <DirectionsRenderer directions={props.directions} panel={ document.getElementById('panel') }/>}
    <div id="panel"></div>
  </GoogleMap>
);

{/* <MapWithADirectionsRenderer /> */}

export default React.memo(MapWithADirectionsRenderer)