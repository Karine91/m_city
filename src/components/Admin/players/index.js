import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import AdminLayout from "../../../hoc/AdminLayout";

import { firebasePlayers } from "../../../firebase";
import { firebaseLooper } from "../../UI/misc";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";

export class AdminPlayers extends Component {
  state = {
    isLoading: true,
    players: []
  };

  componentDidMount() {
    firebasePlayers.once("value").then(snapshot => {
      const players = firebaseLooper(snapshot);

      this.setState({
        isLoading: false,
        players
      });
    });
  }

  render() {
    return (
      <AdminLayout>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Number</TableCell>
                <TableCell>Position</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.players.map((player, ind) => {
                return (
                  <TableRow
                    key={ind}
                    hover={true}
                    style={{
                      cursor: "pointer"
                    }}
                    onClick={() => {
                      this.props.history.push(
                        `/admin_players/edit_players/${player.id}`
                      );
                    }}
                  >
                    <TableCell>{player.name}</TableCell>
                    <TableCell>{player.lastname}</TableCell>
                    <TableCell>{player.number}</TableCell>
                    <TableCell>{player.position}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>
        {this.state.isLoading && (
          <div className="admin_progress">
            <CircularProgress thickness={7} style={{ color: "#98c5e9" }} />
          </div>
        )}
      </AdminLayout>
    );
  }
}

export default withRouter(AdminPlayers);
