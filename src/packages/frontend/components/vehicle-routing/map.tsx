// import React from 'react'
// 

import React from "react";

// // var directionsRequest = {
// //   origin: LatLng | String | google.maps.Place,
// //   destination: LatLng | String | google.maps.Place,
// //   travelMode: TravelMode,
// //   transitOptions: TransitOptions,
// //   drivingOptions: DrivingOptions,
// //   unitSystem: UnitSystem,
// //   waypoints[]: DirectionsWaypoint,
// //   optimizeWaypoints: Boolean,
// //   provideRouteAlternatives: Boolean,
// //   avoidFerries: Boolean,
// //   avoidHighways: Boolean,
// //   avoidTolls: Boolean,
// //   region: String
// // }

// function InitMap() {
//   const { isLoaded } = useJsApiLoader({
//     id: 'google-map-script',
//     googleMapsApiKey: 'AIzaSyBatkKtQkdIob7Ss41D80JYIdUkiT0fH2o'
//   })

//   const [map, setMap] = React.useState(null)

//   const onLoad = React.useCallback(function callback(map) {
//     const bounds = new window.google.maps.LatLngBounds();
//     map.fitBounds(bounds);
//     setMap(map)
//     // initMap()
//   }, [])

//   const onUnmount = React.useCallback(function callback(map) {
//     setMap(null)
//   }, [])
//   const directionsService = new google.maps.DirectionsService();
//   const directionsRenderer = new google.maps.DirectionsRenderer();
//   const map = new google.maps.Map(
//     document.getElementById("map") as HTMLElement,
//     {
//       zoom: 7,
//       center: { lat: 41.85, lng: -87.65 },
//     }
//   );

//   directionsRenderer.setMap(map);

//   const onChangeHandler = function () {
//     calculateAndDisplayRoute(directionsService, directionsRenderer);
//   };

//   (document.getElementById("start") as HTMLElement).addEventListener(
//     "change",
//     onChangeHandler
//   );
//   (document.getElementById("end") as HTMLElement).addEventListener(
//     "change",
//     onChangeHandler
//   );
//   return isLoaded ? (
//     <GoogleMap
//       mapContainerStyle={containerStyle}
//       center={center}
//       zoom={10}
//       onLoad={onLoad}
//       onUnmount={onUnmount}
//     >
//       <TransitLayer/>
//       <Marker
//     position={center}
//   />
//       { <InfoWindow
//     // onLoad={onLoad}
//     position={center}
//   >
//     <div style={divStyle}>
//       <h1>InfoWindow</h1>
//     </div>
//   </InfoWindow>
//       /* Child components, such as markers, info windows, etc. */ }
//       <></>
//     </GoogleMap>
// ) : <></>
// }

// function calculateAndDisplayRoute(
//   directionsService: google.maps.DirectionsService,
//   directionsRenderer: google.maps.DirectionsRenderer
// ) {
//   directionsService
//     .route({
//       origin: {
//         query: (document.getElementById("start") as HTMLInputElement).value,
//       },
//       destination: {
//         query: (document.getElementById("end") as HTMLInputElement).value,
//       },
//       travelMode: google.maps.TravelMode.DRIVING,
//     })
//     .then((response) => {
//       directionsRenderer.setDirections(response);
//     })
//     .catch((e) => window.alert("Directions request failed due to ")); // +status
// }

// const containerStyle = {
//   width: '1920px',
//   height: '1080px'
// };


// const center = {
//   lat: -3.745,
//   lng: -38.523
// };

// const divStyle = {
//   background: `white`,
//   border: `1px solid #ccc`,
//   padding: 15
// }


// function MapComponent() {
//   const { isLoaded } = useJsApiLoader({
//     id: 'google-map-script',
//     googleMapsApiKey: 'AIzaSyBatkKtQkdIob7Ss41D80JYIdUkiT0fH2o'
//   })

//   const [map, setMap] = React.useState(null)

//   const onLoad = React.useCallback(function callback(map) {
//     // const bounds = new window.google.maps.LatLngBounds();
//     // map.fitBounds(bounds);
//     // setMap(map)
//     initMap()
//   }, [])

//   const onUnmount = React.useCallback(function callback(map) {
//     setMap(null)
//   }, [])

//   return isLoaded ? (
//       <GoogleMap
//         mapContainerStyle={containerStyle}
//         center={center}
//         zoom={10}
//         onLoad={onLoad}
//         onUnmount={onUnmount}
//       >
//         <TransitLayer/>
//         <Marker
//       position={center}
//     />
//         { <InfoWindow
//       // onLoad={onLoad}
//       position={center}
//     >
//       <div style={divStyle}>
//         <h1>InfoWindow</h1>
//       </div>
//     </InfoWindow>
//         /* Child components, such as markers, info windows, etc. */ }
//         <></>
//       </GoogleMap>
//   ) : <></>
// }

// export default React.memo(initMap)
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