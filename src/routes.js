import React from "react";
import Layout from "./hoc/Layout";
import { Switch, Route } from "react-router-dom";

import PrivateRoutes from "./components/authRoutes/privateRoutes";
import PublicRoutes from "./components/authRoutes/publicRoutes";

import Home from "./components/Home";
import Login from "./components/Login";
import Dashboard from "./components/Admin/Dashboard";
import AdminMatches from "./components/Admin/matches";
import AddEditMatch from "./components/Admin/matches/addEditMatch";
import AdminPlayers from "./components/Admin/players";
import AddEditPlayers from "./components/Admin/players/AddEditPlayers";
import Team from "./components/team";
import Matches from "./components/Matches";

const Routes = props => {
  return (
    <Layout>
      <Switch>
        <PrivateRoutes
          {...props}
          path="/admin_players"
          exact
          component={AdminPlayers}
        />
        <PrivateRoutes
          {...props}
          path="/dashboard"
          exact
          component={Dashboard}
        />
        <PrivateRoutes
          {...props}
          path="/admin_matches"
          exact
          component={AdminMatches}
        />
        <PrivateRoutes
          {...props}
          path="/admin_matches/edit_match/:id"
          exact
          component={AddEditMatch}
        />
        <PrivateRoutes
          {...props}
          path="/admin_players/edit_players/:id"
          exact
          component={AddEditPlayers}
        />
        <PrivateRoutes
          {...props}
          path="/admin_players/add_players"
          exact
          component={AddEditPlayers}
        />
        <PrivateRoutes
          {...props}
          path="/admin_matches/add_match"
          exact
          component={AddEditMatch}
        />
        <PublicRoutes
          exact
          {...props}
          restricted={false}
          component={Home}
          path="/"
        />
        <PublicRoutes
          exact
          {...props}
          restricted={true}
          component={Login}
          path="/sign_in"
        />
        <PublicRoutes
          exact
          {...props}
          restricted={false}
          component={Team}
          path="/the_team"
        />
        <PublicRoutes
          exact
          {...props}
          restricted={false}
          component={Matches}
          path="/the_matches"
        />
      </Switch>
    </Layout>
  );
};

export default Routes;
