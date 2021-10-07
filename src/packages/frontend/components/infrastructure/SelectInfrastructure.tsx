import { Typography } from "@material-ui/core"
import { infrastructureListener } from "../../../firebase/infrastructure"
import Infrastructure from "../../../model/Infrastructure"
import SelectHasCoordinates, { SelectHasCoordinatesProps } from "../site-wide/mapbox/SelectHasCoordinates"
import InfrastructureMarker from "./InfrastructureMarker"

const SelectInfrastructure = (props: Partial<SelectHasCoordinatesProps<Infrastructure>>) => <SelectHasCoordinates
  {...props}
  render={(item) => (<Typography>
    {item.name}
    </Typography>)}
  itemsListener={infrastructureListener} 
  MarkerElement={InfrastructureMarker}/>

 export default SelectInfrastructure