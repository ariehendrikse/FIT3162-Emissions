import { Box, Button, Grid, TextField, TextFieldProps, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { getVehicleByEPA } from "../../../epa/epa-data";
import { db } from "../../../firebase/firebase";
import { addVehicle } from "../../../firebase/vehicle";
import Vehicle from "../../../model/Vehicle";
import CustomFormProps from "../site/collections/CustomFormProps";
import DeleteButton from "../site/DeleteButton";
import Field from "../site/Field";



const VehicleEpaData = (props: CustomFormProps<Vehicle>) => {
  const {item, style, download} = props
  const [newVehicle, setNewVehicle] = useState<Vehicle | undefined>(item)
  const handleSubmit = (evt: any) => {
    evt.preventDefault();
    addVehicle(newVehicle)
  }
  useEffect(() => {
    if (download && item?.epaID) {
      getVehicleByEPA(item?.epaID)
        .then(v=> setNewVehicle({...v,...item}))
    }
    if (!download) {
      setNewVehicle(item)
    }
  }, [item])

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ flexGrow: 1 }}>
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
            <Field type='number'  label='Urban litres/100km' value={newVehicle?.co2_profile?.urban?.toFixed(2)} setValue={urban => setNewVehicle({...newVehicle as Vehicle, co2_profile: {...newVehicle?.co2_profile, urban: parseInt(urban)}})}/>
          </Grid>
          <Grid item xs={4}>
            <Field type='number'  label='Combined litres/100km' value={newVehicle?.co2_profile?.combined?.toFixed(2)} setValue={combined => setNewVehicle({...newVehicle as Vehicle, co2_profile: {...newVehicle?.co2_profile, combined: parseInt(combined)}})}/>
          </Grid>
          <Grid item xs={4}>
            <Field type='number'  label='Highway litres/100km' value={newVehicle?.co2_profile?.highway?.toFixed(2)} setValue={highway => setNewVehicle({...newVehicle as Vehicle, co2_profile: {...newVehicle?.co2_profile, highway: parseInt(highway)}})}/>
          </Grid>
          <Grid item xs={6}>
            <Field type='number' label="C02g/km" value={newVehicle?.co2_profile?.co2?.toFixed(2)} setValue={co2 => setNewVehicle({...newVehicle as Vehicle, co2_profile: {...newVehicle?.co2_profile, co2: parseInt(co2)}})} />   
          </Grid>
          <Grid item xs={6}>
            <Field type='number'  label='Cargo Capacity in kg' value={newVehicle?.cargo_capacity_kg} setValue={cargo_capacity_kg => setNewVehicle({...newVehicle as Vehicle, cargo_capacity_kg: parseInt(cargo_capacity_kg)})}/>
          </Grid>
          <Grid item xs={12}>
            <Field required label='Vehicle Identification Number (VIN)' value={newVehicle?.vin} setValue={vin => setNewVehicle({...newVehicle as Vehicle, vin})}/>
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth style={{color: 'white', backgroundColor:'green'}} type='submit' >Save</Button>
          </Grid>
          {
            !download ? 
            <Grid item xs={12}>
              <DeleteButton />
            </Grid> :
            undefined
          }

        </Grid>
      </Box>
    </form>
  )
}


export default VehicleEpaData