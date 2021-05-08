import React from 'react'
import './App.css'
import Signup from './Components/Auth/Signup'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Container} from 'react-bootstrap'
import { AuthProvider } from "./Context/authContext"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Login from "./Components/Auth/Login"
import Dashboard from './Components/Drive/Dashboard'
import PrivateRoute from './Components/Auth/PrivateRoute'
import PasswordReset from './Components/Auth/PasswordReset'
import UpdateProfile from './Components/Auth/UpdateProfile'
import NavComponent from './Components/Drive/NavComponent'

export default function App1() {
  

    
    
  return (
      <AuthProvider>   
       
          <Router>
              <NavComponent/>
              <Route exact path="/register" component={Signup} />
              <Route exact path="/" component={Login} />
              <Route exact path="/password-reset" component={PasswordReset} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/update-profile" component={UpdateProfile} />
        <PrivateRoute exact path="/folder/:folderId" component={Dashboard} />
          
        </Router>
</AuthProvider>
  );
}
