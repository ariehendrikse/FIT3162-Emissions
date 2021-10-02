import { TextField } from "@material-ui/core"
import { useEffect, useState } from "react"
import { searchLocation, MapBoxSearchResult } from "../../../../mapbox/geolocater"
import HasCoordinates from "../../../../model/HasCoordinates"

import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { callbackify } from "util";



export function SearchLocation(props: {callback?: (item: HasCoordinates) => any}) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState<readonly MapBoxSearchResult[]>([]);
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const {callback} = props


  React.useEffect(() => {

    setLoading(true)
    searchLocation(search)
      .then(setOptions)
      .then(()=>setLoading(false))
  }, [search]);



  return (
    <Autocomplete
      id="asynchronous-demo"
      fullWidth
      open={open}
      onChange={(e,v) => {
        if (v && callback)  {callback(v)}
      }}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      isOptionEqualToValue={(option, value) => option.name === value.name}
      getOptionLabel={(option) => option.name}
      options={options}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search"
          value={search}
          onChange={e=>setSearch(e.target.value)}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}

export default SearchLocation
