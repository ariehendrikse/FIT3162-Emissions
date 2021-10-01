import { Box, MenuItem, Select } from "@material-ui/core"
import { SelectChangeEvent } from "@mui/material"
import { useEffect, useState } from "react"

import MapGL, {GeolocateControl, Marker,InteractiveMapProps, MarkerProps } from 'react-map-gl'
import { Listener } from "../../../../firebase/Listener"
import HasCoordinates from "../../../../model/HasCoordinates"
import { MarkerElementType } from "../../infrastructure/MapWithMarker"
import { CustomMap } from "../CustomMap"

export type SelectHasCoordinatesProps<T> = {
  itemsListener: Listener<T & HasCoordinates>,
  MarkerElement: MarkerElementType,
  render: (item: T) => JSX.Element,
  children?: JSX.Element[] | JSX.Element,
  showMap?: boolean
}

export default function SelectHasCoordinates<T>(props: SelectHasCoordinatesProps<T>) {
    
  const {itemsListener, MarkerElement, render, children, showMap} = props

  const [items, setItems] = useState<(T & HasCoordinates)[]>([])
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const currentItem = items[currentIndex] ? items[currentIndex] : undefined

  const [viewport, setViewPort ] = useState<InteractiveMapProps>({
    width: "100%",
    height: "100%",
    latitude: items[0]?.coordinates.lat,
    longitude: items[0]?.coordinates.lon,
    transitionDuration: 0,
    zoom: 7,
  })
  useEffect(() => {
    setViewPort({
      ...viewport, 
      latitude: currentItem?.coordinates.lat,
      longitude: currentItem?.coordinates.lon, 
      zoom: 5,
      transitionDuration: 1000
    })
  }, [currentItem])
  useEffect(() => {
    const listener = itemsListener(setItems)
    return listener
  }, [])
  // useEffect(()=> {
  //   console.log(items.length, "items")
  // }, [items])

  const handleChange = (event: any) => {
    setCurrentIndex(parseInt(event.target.value));
  };

  const commonProps = ({viewport, setViewPort})
  return (
      <Box>
        {showMap 
        ? <div style={{height: 'calc(60vh - 150px)',margin: 20 }}>

        <CustomMap {...commonProps} >
          {
            items.map(item => {
              return (<MarkerElement item={item} />)
            })
          }
        </CustomMap>
        </div> : undefined}
        

        <Select
          fullWidth
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={currentIndex}
          label="Age"
          onChange={handleChange}
          style={{margin: 20}}
        >
          {children}
          {items.map((item, i) => 
            <MenuItem value={i}>{render(item)}</MenuItem>)
          }
        </Select>

      </Box>
  )
}