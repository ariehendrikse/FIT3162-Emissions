import { useEffect, useState } from "react"
import HasCoordinates from "../../../../model/HasCoordinates"
import MapGL, {GeolocateControl, Marker,InteractiveMapProps, MarkerProps } from 'react-map-gl'


export default function CustomMarker<T>(props: {item: HasCoordinates & T, color?: string, children?: JSX.Element})  {
  const {item, children, color} = props
  const [viewport, setViewPort] = useState<MarkerProps>({
    latitude: item.coordinates.lat as number,
    longitude: item.coordinates.lon as number
  })
  useEffect(() => {
    setViewPort({
      ...viewport, 
      latitude: item.coordinates.lat as number,
      longitude: item.coordinates.lon as number, 
    })
  }, [item])
  return (<Marker
            {...viewport} 
          >
      <div className="marker" style={{background: color}}>
        <span><b>{children}</b></span>
      </div>
    </Marker>)
}
