import React, { Component } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { firebaseMatches, firebase } from "../../firebase";
import { firebaseLooper, reverseArray } from "../UI/misc";
import LeagueTable from "./table";
import MatchesList from "./MatchesList";

export class Matches extends Component {
  state = {
    isLoading: true,
    matches: [],
    filterMatches: [],
    playerFilter: "All",
    resultFilter: "All"
  };

  componentDidMount() {
    firebaseMatches.once("value").then(snapshot => {
      const matches = firebaseLooper(snapshot);

      this.setState({
        isLoading: false,
        matches: reverseArray(matches),
        filterMatches: reverseArray(matches)
      });
    });
  }

  render() {
    const state = this.state;
    return (
      <div className="the_matches_container flex-container">
        <div className="the_matches_wrapper">
          <div className="left">
            <div className="match_filters" />
            <MatchesList matches={state.matches} />
          </div>
          <div className="right">
            <LeagueTable />
          </div>
        </div>
      </div>
    );
  }
}

export default Matches;
