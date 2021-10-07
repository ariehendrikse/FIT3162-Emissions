
import React,{ useEffect, useState } from 'react'
import MapGL, {GeolocateControl, Marker,InteractiveMapProps, MarkerProps } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import Foundation from '@mui/icons-material/Foundation';
import HasCoordinates from '../../../../model/HasCoordinates';
import CustomMarker from './CustomMarker';

const MiscelaneousLocationMarker = (props: {item: HasCoordinates}) => <CustomMarker {...props} />


export default MiscelaneousLocationMarker