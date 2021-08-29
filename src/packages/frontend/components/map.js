import React from 'react'
import { GoogleMap, useJsApiLoader, InfoWindow, TransitLayer, Marker } from '@react-google-maps/api';


const containerStyle = {
  width: '1000px',
  height: '1000px'
};

const center = {
  lat: -3.745,
  lng: -38.523
};

const divStyle = {
  background: `white`,
  border: `1px solid #ccc`,
  padding: 15
}

const API_KEY = process.env.GOOGLE_API_KEY

function MapComponent() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: API_KEY
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        <TransitLayer/>
        <Marker
      position={center}
    />
        { <InfoWindow
      // onLoad={onLoad}
      position={center}
    >
      <div style={divStyle}>
        <h1>InfoWindow</h1>
      </div>
    </InfoWindow>
        /* Child components, such as markers, info windows, etc. */ }
        <></>
      </GoogleMap>
  ) : <></>
}

export default React.memo(MapComponent)