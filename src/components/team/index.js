import React, { Component } from "react";
import PlayerCard from "../UI/PlayerCard";
import { Fade } from "react-reveal";

import stripes from "../../Resources/images/stripes.png";
import { firebasePlayers, firebase } from "../../firebase";
import { firebaseLooper } from "../UI/misc";
import CircularProgress from "@material-ui/core/CircularProgress";

export class Team extends Component {
  state = {
    isLoading: true,
    players: []
  };

  componentDidMount() {
    firebasePlayers.once("value").then(snapshot => {
      const players = firebaseLooper(snapshot);

      let promises = [];
      for (let key in players) {
        promises.push(this.getImageUrl(players[key]));
      }

      Promise.all(promises).then(() => {
        this.setState({
          isLoading: false,
          players
        });
      });
    });
  }

  getImageUrl = player => {
    return new Promise((resolve, reject) => {
      firebase
        .storage()
        .ref("players")
        .child(player.image)
        .getDownloadURL()
        .then(url => {
          player.url = url;
          resolve();
        })
        .catch(err => {
          console.log(err);
        });
    });
  };

  showPlayersByCategory = category => {
    if (this.state.players.length) {
      return this.state.players.map((player, i) => {
        return player.position === category ? (
          <Fade left delay={i * 20} key={player.url}>
            <div className="item">
              <PlayerCard
                number={player.number}
                name={player.name}
                lastName={player.lastname}
                bck={player.url}
              />
            </div>
          </Fade>
        ) : null;
      });
    }
  };

  render() {
    return (
      <div
        className="the_team_container flex-container"
        style={{
          background: `url(${stripes}) repeat`
        }}
      >
        {!this.state.isLoading ? (
          <div>
            <div className="team_category_wrapper">
              <div className="title">Keepers</div>
              <div className="team_cards">
                {this.showPlayersByCategory("Keeper")}
              </div>
              <div className="title">Defence</div>
              <div className="team_cards">
                {this.showPlayersByCategory("Defence")}
              </div>
              <div className="title">Midfield</div>
              <div className="team_cards">
                {this.showPlayersByCategory("Midfield")}
              </div>
              <div className="title">Strikers</div>
              <div className="team_cards">
                {this.showPlayersByCategory("Striker")}
              </div>
            </div>
          </div>
        ) : (
          <div
            className="progress"
            style={{
              justifyContent: "center",
              margin: "30px 0",
              height: "100%",
              display: "flex",
              alignItems: "center"
            }}
          >
            <CircularProgress
              style={{
                color: "#98c6e9"
              }}
              thickness={7}
            />
          </div>
        )}
      </div>
    );
  }
}

export default Team;
