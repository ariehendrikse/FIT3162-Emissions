import React,{ useEffect, useState } from 'react'
import MapGL, {GeolocateControl, Marker,InteractiveMapProps, MarkerProps } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import HasCoordinates from '../../../../model/HasCoordinates';
import './Marker.css'
import Infrastructure from '../../../../model/Infrastructure';
import Foundation from '@mui/icons-material/Foundation';
import { CustomMap } from './CustomMap';

export type MarkerElementType = (props: { item: HasCoordinates; }) => JSX.Element

const MapWithMarker = (props: {
  item: HasCoordinates, 
  items?: HasCoordinates[], 
  MarkerElement: MarkerElementType}) => {

  const {item, MarkerElement} = props
  const [viewport, setViewPort ] = useState<InteractiveMapProps>({
    width: "100%",
    height: "100%",
    latitude: item.coordinates.lat,
    longitude: item.coordinates.lon,
    transitionDuration: 0,
    zoom: 7,
  })
  useEffect(() => {
    setViewPort({
      ...viewport, 
      latitude: item.coordinates.lat,
      longitude: item.coordinates.lon, 
      transitionDuration: 1000
    })
  }, [item])

  const _onViewportChange = (viewport: any) => setViewPort({...viewport, transitionDuration: 0 })
  const commonProps= ({setViewPort, viewport})

  return (
    <div style={{height: 'calc(50vh - 150px)',margin: 20 }}>
      <CustomMap {...commonProps}>
          <MarkerElement item={item} />
       </CustomMap>
      </div>
     )
}



export default MapWithMarker
