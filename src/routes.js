import React from "react";
import Layout from "./hoc/Layout";
import { Switch, Route } from "react-router-dom";

import PrivateRoutes from "./components/authRoutes/privateRoutes";

import Home from "./components/Home";
import Login from "./components/Login";
import Dashboard from "./components/Admin/Dashboard";

const Routes = props => {
  return (
    <Layout>
      <Switch>
        <PrivateRoutes
          {...props}
          path="/dashboard"
          exact
          component={Dashboard}
        />
        <Route exact component={Home} path="/" />
        <Route component={Login} path="/sign_in" />
      </Switch>
    </Layout>
  );
};

export default Routes;
