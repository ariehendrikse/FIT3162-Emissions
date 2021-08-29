
import { useEffect, useState} from 'react';
import * as React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { Dashboard } from './Dashboard';
import firebase from 'firebase';
import MapComponent from '../map';
import { db } from '../../../firebase/firebase';
import { Box, Card, CardContent, CircularProgress, Grid, Typography } from '@material-ui/core';

// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  prompt: "Sign into Emissions app",
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID
  ],
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: () => false,
  }
};

export default function AuthPage() {
  const [isSignedIn, setIsSignedIn] = useState(true); // Local signed-in state.
  const [loading, setLoading] = useState(true)
  console.log(db.app)

  // Listen to the Firebase Auth state and set the local state.
  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
      setLoading(false)
      setIsSignedIn(!!user);
    });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);
  if (loading) return (
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ maxHeight: '100vh' , minHeight: '75vh'}}
        >
        <Grid item xl={12}>         
            <Box>
              Checking authentication status
            </Box>
        </Grid>   

        <Grid item xl={12}>         
          <CircularProgress />
        </Grid>   
      </Grid>
  )
      
  else if (!isSignedIn) return (   
    <div style={{height:'100%', width: '100%', margin: 0, display: "flex",
    justifyContent: "center",
    alignItems: "center"}}>
      <Card style={{borderBottomLeftRadius: 30, borderBottomRightRadius: 30,borderTopRightRadius: 0, borderTopLeftRadius: 0, backgroundColor: 'lightgreen'}}>
        <CardContent>
          <Grid
            container
            spacing={4}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ maxHeight: '100vh' , minHeight: '75vh'}}
          >
            
          <Grid item xl={12}>         
              <Box>
                <Typography variant='h1' style={{color:'white'}}>Emissions app</Typography>
              </Box>
          </Grid>   

          <Grid item xl={12}>         
            <Box width={800}>
              <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
            </Box> 
           
            </Grid>   
          </Grid>   
        </CardContent>
      </Card> 
    </div>

  )
  return (
    // <Dashboard />
    <>
    <MapComponent /> 
  </>
    )

}


