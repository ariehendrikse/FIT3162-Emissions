import HasCoordinates from "./HasCoordinates"

type Vehicle = {
  id? : string
  make: string
  model: string
  year: string
  trim?: string
  epaID?: string
  co2_profile?: CO2Profile
  cargo_capacity_kg?: number
  vin?: string
} & Partial<HasCoordinates>

export type CO2Profile = {
  highway?: number
  combined?: number
  urban?: number
  co2?: number
}

export type VehicleModel = {
  name: string
}

export type VehicleMake = {
  name: string
}

export default Vehicle
