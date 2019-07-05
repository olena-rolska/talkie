import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {BrowserRouter as Router, Route, Switch}  from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import LogIn from './components/LogIn.js';
import Main from './components/Main.js';
import Messages from './components/Messages.js';
import SignUp from './components/SignUp.js';

const AppRouter = () => {
  return (
    <Router>
    <Switch>
      <Route path ='/' exact component={Main}/>
      <Route exact path ='/login/' component={LogIn}/>
      <Route exact path ='/messages/' component={Messages}/>
      <Route path ='/signup' component={SignUp}/>
    </Switch>
    </Router>
  )
}

export default AppRouter;