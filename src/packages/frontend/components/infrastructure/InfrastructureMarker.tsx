
import React,{ useEffect, useState } from 'react'
import MapGL, {GeolocateControl, Marker,InteractiveMapProps, MarkerProps } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import Foundation from '@mui/icons-material/Foundation';
import Infrastructure from '../../../model/Infrastructure';
import HasCoordinates from '../../../model/HasCoordinates';
import CustomMarker from '../site/mapbox/CustomMarker';

const InfrastructureMarker = (props: {item: Infrastructure | HasCoordinates}) => <CustomMarker {...props}><Foundation /></CustomMarker>

export default InfrastructureMarker