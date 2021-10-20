import React,{ useEffect, useState } from 'react'
import MapGL, {GeolocateControl, Marker,InteractiveMapProps, MarkerProps } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import HasCoordinates from '../../../model/HasCoordinates';
import infrastructure from '../../../model/Infrastructure';
import Foundation from '@mui/icons-material/Foundation';
const TOKEN='pk.eyJ1IjoiYXJpZWhlbmRyaWtzZSIsImEiOiJja3U2OXA4N3UzNnA3MnVxaHlmOTkzZHBjIn0.Ykl1qpTqORkJ16KJyLUR7Q'

const geolocateStyle = {
  float: 'left',
  margin: '50px',
  padding: '10px'
};

export const CustomMap = (props: {
  setViewPort: (value: InteractiveMapProps) => void, 
  viewport?: InteractiveMapProps, 
  children?: JSX.Element[] | JSX.Element
  }) => {
    
  const _onViewportChange = (viewport: any) => setViewPort({...viewport, transitionDuration: 0 })
  const {viewport, setViewPort, children} = props
  return (
    <MapGL
      {...viewport}
      mapboxApiAccessToken={TOKEN}
      onViewportChange={_onViewportChange}
      style={{overflow: 'hidden' , borderRadius: 20,}}
      >
      <GeolocateControl
        style={geolocateStyle}
        positionOptions={{enableHighAccuracy: true}}
        trackUserLocation={true}
        />
        {children}
        
      </MapGL>
     )
}