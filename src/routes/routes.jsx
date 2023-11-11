import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { Login } from "../pages/Login/Login";
import { Register } from "../pages/Register/Register";
import { Home } from "../pages/Home/Home";
import {Services } from "../pages/Services/Services"



export function MyRoutes(){
    const [currentForm, setCurrentForm] = useState('login');

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }
    return(
        <Router>
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/services" component={Services} />
          <Route path="/login">
            {
              currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} />
            }
          </Route>
          <Redirect  from="/" to="login" />
        </Switch>
      </Router> 
    );
}