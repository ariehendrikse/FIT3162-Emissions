type Vehicle = {
  make: VehicleMake
  model: VehicleModel
  year: number
  co2_profile: CO2Profile
}

export type CO2Profile = {
  highway?: number
  combined: number
  urban?: number
}

export type VehicleModel = {
  name: string
}

export type VehicleMake = {
  name: string
}

export default Vehicle
