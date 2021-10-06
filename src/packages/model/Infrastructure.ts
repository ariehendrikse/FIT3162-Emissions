import HasCoordinates from "./HasCoordinates"

type Infrastructure = {
  id?: string
  
  name: string
} & HasCoordinates

export default Infrastructure