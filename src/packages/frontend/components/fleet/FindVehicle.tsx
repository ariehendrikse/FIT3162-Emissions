import { FormControl, InputLabel, MenuItem, TextField } from '@material-ui/core';
import { Autocomplete, Select } from '@mui/material';
import { Box } from '@mui/system';
import * as React from 'react';
import { useState } from 'react';
import { getMakesForYear, getModelsForMakeAndYear, getTrims, getYears } from '../../../epa/epa-data';
import Vehicle from '../../../model/Vehicle';
import SelectBox, { SelectBoxProps } from './SelectBox';


export type FindVehicleProps = {
  style?: React.CSSProperties;
  set: (vehicle?: Vehicle) => any;
}
 
export const FindVehicle = (props: FindVehicleProps) => {
  const {set} = props
  const [year, setYear] = useState<string | undefined>(undefined)
  const [make, setMake] = useState<string | undefined>(undefined)
  const [model, setModel] = useState<string | undefined>(undefined)
  const [trim, setTrim] = useState<string | undefined>(undefined)

  const setVehicle = (value?: {name: string, value: string}) => {
    if (make && model && year && value?.value) {
      set({
        make: (make as string),
        model: (model as string),
        year: (year as string),
        epaID: (value?.value as string),
        trim: value.name,
      })
    }
    else {
      set(undefined)
    }
    
  }
  React.useEffect(() => {
    set(undefined)
  }, [model])
  React.useEffect(() => {
    setModel(undefined)
  }, [make])
  React.useEffect(() => {
    setMake(undefined)
  }, [year])
  
  const setter = (setFunction: (val?: string) => any) => (val?: {name: string, value: string}) => {
    setFunction(val?.value)
  } 

  const boxes: SelectBoxProps[] = [
    {
      label: 'Year',
      searchValue: '2020',
      search: getYears,
      set: setter(setYear)
    }, 
    {
      label: 'Make',
      searchValue: year,
      search: getMakesForYear,
      set: setter(setMake)
    }, 
    {
      label: 'Model',
      searchValue: make,
      search: getModelsForMakeAndYear(year),
      set: setter(setModel)
    },
    {
      label: 'Trim',
      searchValue: model,
      search: getTrims(year)(make),
      set: setVehicle
    }
]

  const {style} = props
  return (
    <Box style={style} m={2}>
      {boxes.map(SelectBox)}
    </Box>
  )
}