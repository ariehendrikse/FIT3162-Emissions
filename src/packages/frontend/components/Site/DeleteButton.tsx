import { Button } from "@material-ui/core"

const DeleteButton = (props: {deleteAction: () => any}) => {
  return (
  <Button style={{color: 'white', background: 'red'}}>
    Delete
  </Button>
  )
}

export default DeleteButton