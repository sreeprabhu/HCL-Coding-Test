import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import './index.css';
import Password from './Password';
import { Grid } from '@material-ui/core';

function Router() {
  return (
    <BrowserRouter>
      <Grid container flex-direction="row" justify="center" alignItems="center" xs={12}>
        <Switch>
          <Route exact path="/" component={Password}></Route>
        </Switch>
      </Grid>
    </BrowserRouter>);
}

export default Router;