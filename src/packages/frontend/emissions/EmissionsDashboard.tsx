import { Box, Button, Grid, Paper } from "@material-ui/core";
import firebase from "firebase";
import { db } from "../../firebase/firebase";
import MainAppBar from "../components/Site/AppBar";

const EmissionsDashboard = () => <div>
  <MainAppBar /> Sign in success <Button onClick={() => firebase.auth().signOut()}>Sign out</Button>
  <Box height="90vh">
    <Grid container style={{paddingTop: 30, paddingLeft:  30, height: 'calc(100vh - 150px)', width: '100vw'}} spacing={10} justifyContent='space-around' >
      <Grid container style={{height: `calc(100vh - 100px)`}} spacing={0} item xs={3} direction='column'>
        <Grid item xs={12}>
          <Paper style={{height: '100%'}}>
            hello
          </Paper>
        </Grid>
      </Grid>
      <Grid container item xs={9}>
        <Paper>
          hi
        </Paper>
      </Grid>
    </Grid>
  </Box>

 
  
  </div>
export default EmissionsDashboard