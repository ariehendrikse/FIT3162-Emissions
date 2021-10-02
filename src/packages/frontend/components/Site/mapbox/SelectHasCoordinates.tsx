import { Box, MenuItem, Select, Typography } from "@material-ui/core"
import { SelectChangeEvent } from "@mui/material"
import { useEffect, useState } from "react"

import MapGL, {GeolocateControl, Marker,InteractiveMapProps, MarkerProps } from 'react-map-gl'
import { Listener } from "../../../../firebase/Listener"
import HasCoordinates from "../../../../model/HasCoordinates"
import { MarkerElementType } from "./MapWithMarker"
import { CustomMap } from "./CustomMap"
import SearchLocation from "./SearchLocation"
import MiscelaneousLocationMarker from "./MiscelaneousLocationMarker"

export type SelectHasCoordinatesProps<T> = {
  itemsListener: Listener<T & HasCoordinates>,
  MarkerElement: MarkerElementType,
  render: (item: T) => JSX.Element,
  children?: JSX.Element[] | JSX.Element,
  showMap?: boolean,
  callback?: (item?: HasCoordinates) => any
}

export default function SelectHasCoordinates<T>(props: SelectHasCoordinatesProps<T>) {
    
  const {itemsListener, MarkerElement, render, children, showMap, callback} = props

  const [items, setItems] = useState<(T & HasCoordinates)[]>([])
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [currentItem, setCurrentItem] = useState<HasCoordinates | undefined>(items[currentIndex] ? items[currentIndex] : undefined)

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
  useEffect(()=> {
    if (items.length > 0 ) {
      setCurrentIndex(0)
      setCurrentItem(items[currentIndex])
    }
  }, [items])

  const handleChange = (event: any) => {
    setCurrentIndex(parseInt(event.target.value));
    setCurrentItem(items[parseInt(event.target.value)])
    if (callback) {
      callback(items[parseInt(event.target.value)] ? items[parseInt(event.target.value)] : undefined)
    } 
  };
  // @ts-ignore
  const miscItem = (!currentItem || items.includes(currentItem)) ? [] : [<MiscelaneousLocationMarker item={currentItem} />]

  const commonProps = ({viewport, setViewPort})
  return (
      <Box>
        <Box>
          <Typography variant='caption'>
            Location<br/>
          </Typography>
            <Select
            fullWidth
            variant='outlined'
            value={currentIndex}
            onChange={handleChange}
          >
            {children}
            {items.map((item, i) => 
              <MenuItem value={i}>{render(item)}</MenuItem>)
            }
          </Select>
        </Box>
        <Box>
          <SearchLocation callback={(v) => {
            setCurrentItem(v)
            if (callback) {callback(v)}
          }}/>
        </Box>
        {showMap 
        ? <div style={{height: 'calc(60vh - 150px)',marginBlock: 20 }}>

        <CustomMap {...commonProps} >
          {
            [...items.map(item => {
              return (<MarkerElement item={item} />)
            }),
            ...miscItem]}
          
        </CustomMap>
        </div> : undefined}
      </Box>
  )
}