import { Box, Button, Grid, TextField, TextFieldProps, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { getVehicleByEPA } from "../../../epa/epa-data";
import { db } from "../../../firebase/firebase";
import { addVehicle } from "../../../firebase/vehicle";
import Vehicle from "../../../model/Vehicle";

export function Field(props: TextFieldProps & {setValue: (val: string) => any}) {
  const {label, value, setValue, type, required} = props
  
  
  return (
        <Box>
          <Typography variant='caption'>
            {label}<br/>
          </Typography>
          <TextField
            fullWidth
            type={type ? type : "text"}
            value={value}
            variant='outlined'
            onChange={e => setValue(e.target.value)}
            required={required}
          />
        </Box>
        
  );
}

const VehicleEpaData = (props: {vehicle?: Vehicle, style?: React.CSSProperties, download?: boolean}) => {
  const {vehicle, style, download} = props
  const [newVehicle, setNewVehicle] = useState<Vehicle | undefined>(vehicle)
  const handleSubmit = (evt: any) => {
    evt.preventDefault();
    addVehicle(newVehicle)
}
  useEffect(() => {
    if (download && vehicle?.epaID) {
      getVehicleByEPA(vehicle?.epaID)
        .then(v=> setNewVehicle({...v,...vehicle}))
    }
    if (!download) {
      setNewVehicle(vehicle)
    }
  }, [vehicle])

  return (
    <form onSubmit={handleSubmit}>
      <Box m={2} sx={{ flexGrow: 1 }}>
        <Grid spacing={1} container style={style} alignItems='center'>
          <Grid item xs={4}>
            <Field label='Make' value={newVehicle?.make} setValue={make => setNewVehicle({...newVehicle as Vehicle, make})}/>
          </Grid>
          <Grid item xs={4}>
            <Field label={"Model"} value={newVehicle?.model} setValue={model => setNewVehicle({...newVehicle as Vehicle, model})} />
          </Grid>
          <Grid item xs={4}>
            <Field label={"Year"} value={newVehicle?.year} setValue={year => setNewVehicle({...newVehicle as Vehicle, year})} />
          </Grid>
          <Grid item xs={6}>
            <Field label={"Trim"} value={newVehicle?.trim} setValue={trim => setNewVehicle({...newVehicle as Vehicle, trim})} />
          </Grid>
          <Grid item xs={6}>
            <Field type='number'  label={"EPA ID"} value={newVehicle?.epaID} setValue={epaID => setNewVehicle({...newVehicle as Vehicle, epaID})} />
          </Grid>
          <Grid item xs={4}>
            <Field type='number' label="C02g/km" value={newVehicle?.co2_profile?.co2?.toFixed(2)} setValue={co2 => setNewVehicle({...newVehicle as Vehicle, co2_profile: {...newVehicle?.co2_profile, co2: parseInt(co2)}})} />   
          </Grid>
          <Grid item xs={4}>
            <Field type='number'  label='Combined litres/100km' value={newVehicle?.co2_profile?.combined?.toFixed(2)} setValue={combined => setNewVehicle({...newVehicle as Vehicle, co2_profile: {...newVehicle?.co2_profile, combined: parseInt(combined)}})}/>
          </Grid>
          <Grid item xs={4}>
            <Field type='number'  label='Cargo Capacity in kg' value={newVehicle?.cargo_capacity_kg} setValue={cargo_capacity_kg => setNewVehicle({...newVehicle as Vehicle, cargo_capacity_kg: parseInt(cargo_capacity_kg)})}/>
          </Grid>
          <Grid item xs={12}>
            <Field required label='Vehicle Identification Number (VIN)' value={newVehicle?.vin} setValue={vin => setNewVehicle({...newVehicle as Vehicle, vin})}/>
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth style={{color: 'white', backgroundColor:'green'}} type='submit' >Save</Button>
          </Grid>

        </Grid>
      </Box>
    </form>
  )
}


export default VehicleEpaData