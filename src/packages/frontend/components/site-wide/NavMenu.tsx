import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid, { GridSpacing } from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Paper from '@material-ui/core/Paper';
import { Box, Card, CardActionArea, CardContent, Typography } from '@material-ui/core';
import { AuthContext } from './AuthProvider';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 300,
    width: 300,
  },
  control: {
    padding: theme.spacing(2),
  },

  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));

export default function NavMenu() {
  const [spacing, setSpacing] = useState(2);
  const classes = useStyles();
  const user = useContext(AuthContext)

  return (
    <Grid container className={classes.root} spacing={2} >
      <Grid item xs={12}>
        <Grid container justifyContent="center" spacing={spacing as GridSpacing}>
          
          <Grid key={2} item>
            <Card>
              <CardActionArea className={classes.paper} href="#route">
                  <CardContent>
                    <Typography variant='h4'>Plan trip</Typography>
                    <Typography className={classes.pos} color="textSecondary">Calculate lowest emissions route.</Typography>
                  </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          {
            user?.admin ? (
              <React.Fragment>

                {/* Put this here when Emissions is completed, it is not for now */}

                {/* <Grid key={1} item>
                  <Card>
                    <CardActionArea className={classes.paper} href="#emissions">
                        <CardContent>
                          <Typography variant='h4'>View emissions</Typography>
                          <Typography className={classes.pos} color="textSecondary">Company emissions data and summary.</Typography>
                        </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid> */}

                <Grid key={3} item>
                  <Card>
                    <CardActionArea className={classes.paper} href="#fleet">
                        <CardContent>
                          <Typography variant='h4'>Fleet</Typography>
                          <Typography className={classes.pos} color="textSecondary">Manage your fleet vehicles.</Typography>
                        </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
                <Grid key={4} item>
                  <Card>
                    <CardActionArea className={classes.paper} href="#infrastructure">
                        <CardContent>
                          <Typography variant='h4'>Infrastructure</Typography>
                          <Typography className={classes.pos} color="textSecondary">Manage warehouses and depots</Typography>
                        </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              </React.Fragment> 
            ): undefined
          }
          
        </Grid>
      </Grid>
      
    </Grid>
  );
}
