import React, { Component } from "react";
import { easePolyOut } from "d3-ease";
import Animate from "react-move/Animate";
import PropTypes from "prop-types";
import { firebasePlayers, firebase } from "../../../firebase";
import { firebaseLooper } from "../../UI/misc";

import PlayerCard from "../../UI/PlayerCard";

export class Homecards extends Component {
  state = {
    show: this.props.show,
    players: []
  };

  componentDidMount() {
    firebasePlayers.once("value").then(snapshot => {
      const players = firebaseLooper(snapshot);

      let randomPlayers = this.getRandomPlayers(players);
      let promises = [];
      for (let key in randomPlayers) {
        promises.push(
          new Promise((resolve, reject) => {
            firebase
              .storage()
              .ref("players")
              .child(randomPlayers[key].image)
              .getDownloadURL()
              .then(url => {
                randomPlayers[key].url = url;
                resolve();
              })
              .catch(err => {
                resolve();
              });
          })
        );
      }

      Promise.all(promises).then(() => {
        this.setState({
          players: randomPlayers
        });
      });
    });
  }

  getRandomPlayers = players => {
    let playerChoose = [];
    while (playerChoose.length < 4) {
      let randomIndex = Math.floor(Math.random() * players.length);
      if (playerChoose.indexOf(randomIndex) === -1) {
        playerChoose.push(randomIndex);
      }
    }
    return playerChoose.map(item => players[item]);
  };

  showAnimatedCards = () => {
    return this.state.players.map((player, i) => (
      <Animate
        key={i}
        show={this.props.show}
        start={{
          left: 0,
          bottom: 0
        }}
        enter={{
          left: [(this.state.players.length - 1 - i) * 100],
          bottom: [(this.state.players.length - 1 - i) * 30],
          timing: { duration: 500, ease: easePolyOut }
        }}
      >
        {({ left, bottom }) => (
          <div
            style={{
              position: "absolute",
              left,
              bottom
            }}
          >
            <PlayerCard
              number={player.number}
              name={player.name}
              lastName={player.lastname}
              bck={player.url}
            />
          </div>
        )}
      </Animate>
    ));
  };

  render() {
    return <div>{this.showAnimatedCards()}</div>;
  }
}

Homecards.propTypes = {
  show: PropTypes.bool
};

export default Homecards;
