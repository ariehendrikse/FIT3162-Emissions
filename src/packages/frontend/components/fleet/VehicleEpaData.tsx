import { Box } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { getVehicleByEPA } from "../../../epa/epa-data";
import Vehicle from "../../../model/Vehicle";

const VehicleEpaData = (props: {vehicle?: Vehicle, style?: React.CSSProperties}) => {
  const {vehicle, style} = props
  const [newVehicle, setNewVehicle] = useState<Vehicle | undefined>(undefined)
  useEffect(() => {
    if (vehicle?.epaID) {
      getVehicleByEPA(vehicle?.epaID)
        .then(v=> setNewVehicle({...v,...vehicle}))
    }
  }, [vehicle])

  return (
    <Box style={style}>
      {newVehicle?.trim}
    </Box>
  )
}


export default VehicleEpaData