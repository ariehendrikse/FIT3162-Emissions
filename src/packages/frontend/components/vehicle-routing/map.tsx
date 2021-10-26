import { render } from "@testing-library/react";
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

const google = window.google;

function initMap(): void {
  const map = new google.maps.Map(
    document.getElementById("map") as HTMLElement,
    {
      mapTypeControl: false,
      center: { lat: -33.8688, lng: 151.2195 },
      zoom: 13,
    }
  );

  new AutocompleteDirectionsHandler(map);
}

class AutocompleteDirectionsHandler {
  map: google.maps.Map;
  originPlaceId: string;
  destinationPlaceId: string;
  travelMode: google.maps.TravelMode;
  directionsService: google.maps.DirectionsService;
  directionsRenderer: google.maps.DirectionsRenderer;

  constructor(map: google.maps.Map) {
    this.map = map;
    this.originPlaceId = "";
    this.destinationPlaceId = "";
    this.travelMode = google.maps.TravelMode.DRIVING;
    this.directionsService = new google.maps.DirectionsService();
    this.directionsRenderer = new google.maps.DirectionsRenderer();
    this.directionsRenderer.setMap(map);

    const originInput = document.getElementById(
      "origin-input"
    ) as HTMLInputElement;
    const destinationInput = document.getElementById(
      "destination-input"
    ) as HTMLInputElement;


    const originAutocomplete = new google.maps.places.Autocomplete(originInput);

    // Specify just the place data fields that you need.
    originAutocomplete.setFields(["place_id"]);

    const destinationAutocomplete = new google.maps.places.Autocomplete(
      destinationInput
    );

    // Specify just the place data fields that you need.
    destinationAutocomplete.setFields(["place_id"]);


    this.setupPlaceChangedListener(originAutocomplete, "ORIG");
    this.setupPlaceChangedListener(destinationAutocomplete, "DEST");

    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(originInput);
    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(
      destinationInput
    );

  }

  // Sets a listener on a radio button to change the filter type on Places
  // Autocomplete.
  setupClickListener(id: string, mode: google.maps.TravelMode) {
    const radioButton = document.getElementById(id) as HTMLInputElement;

    radioButton.addEventListener("click", () => {
      this.travelMode = mode;
      this.route();
    });
  }

  setupPlaceChangedListener(
    autocomplete: google.maps.places.Autocomplete,
    mode: string
  ) {
    autocomplete.bindTo("bounds", this.map);

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();

      if (!place.place_id) {
        window.alert("Please select an option from the dropdown list.");
        return;
      }

      if (mode === "ORIG") {
        this.originPlaceId = place.place_id;
      } else {
        this.destinationPlaceId = place.place_id;
      }

      this.route();
    });
  }

  route() {
    if (!this.originPlaceId || !this.destinationPlaceId) {
      return;
    }

    const me = this;

    this.directionsService.route(
      {
        origin: { placeId: this.originPlaceId },
        destination: { placeId: this.destinationPlaceId },
        travelMode: this.travelMode,
        provideRouteAlternatives: true,
      },
      (response, status) => {
        if (status === "OK") {
          me.directionsRenderer.setDirections(response);
        } else {
          window.alert("Directions request failed due to " + status);
        }
      }
    );
  }
}


// const { compose, withProps, lifecycle } = require("recompose");
// const {
//   withScriptjs,
//   withGoogleMap,
//   GoogleMap,
//   DirectionsRenderer,
// } = require("react-google-maps");

// let testVehicle: Vehicle[] = [{
//   make: "Toyota",
//   model: "Camry",
//   year: "1999",
//   co2_profile: {highway: 50, combined: 30, urban: 80, co2: 30}
// }];

// let autocomplete;



// const MapWithADirectionsRenderer = compose(
//   withProps({
//     googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyBatkKtQkdIob7Ss41D80JYIdUkiT0fH2o&v=3.exp&libraries=geometry,drawing,places",
//     loadingElement: <div style={{ height: `100%` }} />,
//     containerElement: <div style={{ height: `800px` }} />,
//     mapElement: <div style={{ height: `100%` }} />,
//   }),
//   withScriptjs,
//   withGoogleMap,
//   lifecycle({
//     componentDidMount() {
//       const DirectionsService = new google.maps.DirectionsService();

//       // Using google's autocomplete to search for the origin and destination
//       const input_origin = document.getElementById("autocomplete_origin") as HTMLInputElement;
//       const autocomplete_origin = new google.maps.places.Autocomplete(input_origin, {});

//       const input_destination = document.getElementById("autocomplete_destination") as HTMLInputElement;
//       const autocomplete_destination = new google.maps.places.Autocomplete(input_origin, {});

//       // console.log(autocomplete_destination.getPlace().geometry?.location?.lat())



//       DirectionsService.route({
//         origin: new google.maps.LatLng(-37.8774, 145.0450),
//         destination: new google.maps.LatLng(-37.9144, 145.1300),
//         provideRouteAlternatives: true,
//         travelMode: google.maps.TravelMode.DRIVING,
//       }, (result, status) => {
//         // Updated to display multiple routes concurrently
//         if (status === google.maps.DirectionsStatus.OK) {
//           this.setState({
//             directions: result,
            
//           });
//           // const routes = result.routes
//           if (result ) {
//           const emissions: HasEmissions = mpg.optimalPathEmissions(result.routes, testVehicle )
//           console.log(emissions.emissions)
//           }
//         } else {
//           console.error(`error fetching directions ${result}`);
//         }
//       });
//     }
//   })
// )((props: { directions: any; }) =>
//   <><GoogleMap
//     defaultZoom={7}
//     defaultCenter={new google.maps.LatLng(-37.8774, 145.0450)}
//   >
//     {props.directions && <DirectionsRenderer directions={props.directions} panel={document.getElementById('panel')} />}
//     <div id="panel"></div>
//   </GoogleMap>
//   <input id="autocomplete_origin" placeholder="Enter a place" type="text" />
//   <input id="autocomplete_destination" placeholder="Enter a place" type="text" /></>
// );

// {/* <MapWithADirectionsRenderer /> */}
// <script async
//     src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBatkKtQkdIob7Ss41D80JYIdUkiT0fH2o&libraries=places&callback=initMap">
// </script>

function MapWithADirectionsRenderer() {
  initMap();

  return(
    <>
      <div>
        <input
          id="origin-input"

          type="text"
          placeholder="Enter an origin location" />

        <input
          id="destination-input"
          type="text"
          placeholder="Enter a destination location" />

      </div>

      <div id="map"></div>

      <script
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBatkKtQkdIob7Ss41D80JYIdUkiT0fH2o&callback=initMap&libraries=places&v=weekly&channel=2"
        async
      ></script>
    </>)}

export default React.memo(MapWithADirectionsRenderer)