import React from "react";

const { compose, withProps, lifecycle } = require("recompose");
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer,
} = require("react-google-maps");

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

      DirectionsService.route({
        origin: new google.maps.LatLng(-37.8774, 145.0450),
        destination: new google.maps.LatLng(-37.9144, 145.1300),
        provideRouteAlternatives: true,
        travelMode: google.maps.TravelMode.DRIVING,
      }, (result, status) => {
        // Update to display multiple routes concurrently
        if (status === google.maps.DirectionsStatus.OK) {
          this.setState({
            directions: result,
          });
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
    {props.directions && <DirectionsRenderer directions={props.directions} />}
  </GoogleMap>
);

<MapWithADirectionsRenderer />

export default React.memo(MapWithADirectionsRenderer)