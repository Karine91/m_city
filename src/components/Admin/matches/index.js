import React, { Component } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../../../hoc/AdminLayout";
import { firebaseMatches } from "../../../firebase";
import { firebaseLooper, reverseArray } from "../../UI/misc";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";

export class AdminMatches extends Component {
  state = {
    isLoading: true,
    matches: []
  };

  componentDidMount() {
    firebaseMatches.once("value").then(snapshot => {
      const matches = firebaseLooper(snapshot);

      this.setState({
        isLoading: false,
        matches: reverseArray(matches)
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
                <TableCell>Date</TableCell>
                <TableCell>Match</TableCell>
                <TableCell>Result</TableCell>
                <TableCell>Final</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.matches.map((match, ind) => {
                return (
                  <TableRow key={ind}>
                    <TableCell>{match.date}</TableCell>
                    <TableCell>
                      <Link to={`/admin_matches/edit_match/${match.id}`}>
                        {match.away} - {match.local}
                      </Link>
                    </TableCell>
                    <TableCell>
                      {match.resultAway} - {match.resultLocal}
                    </TableCell>
                    <TableCell>
                      {match.final === "Yes" ? (
                        <span className="matches_tag_red">Final</span>
                      ) : (
                        <span className="matches_tag_green">
                          Not played yet
                        </span>
                      )}
                    </TableCell>
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

export default AdminMatches;
