import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import SignIn from './components/SignIn.js';
import SignUp from './components/SignUp.js';
import Home from './components/Home.js';
import Messages from './components/Messages.js';
import Message from './components/Message.js';

const AppRouter = () => {
  return(
    <Router>
      <Switch>
        <Route path ='/' exact component={Home}/>
        <Route path ='/signup/' exact component={SignUp}/>
        <Route path ='/signin/' exact component={SignIn}/>
        <Route path ='/messages/' exact component={Messages}/>
        <Route path ='/message/:id' exact component={Message}/>
      </Switch>
    </Router>
  )
}

export default AppRouter;