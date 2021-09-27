type Vehicle = {
  make: string
  model: string
  year: string
  trim?: string
  epaID?: string
  co2_profile?: CO2Profile
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
