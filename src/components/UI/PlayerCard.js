import React from "react";
import PropTypes from "prop-types";

class PlayerCard extends React.Component {
  componentDidMount() {
    const preload = new Image();
    preload.src = this.props.bck;
  }

  render() {
    return (
      <div className="player_card_wrapper">
        <div
          className="player_card_thmb"
          style={{
            background: `#f2f9ff url(${this.props.bck})`
          }}
        />
        <div className="player_card_nfo">
          <div className="player_card_number">{this.props.number}</div>
          <div className="player_card_name">
            <span>{this.props.name}</span>
            <span>{this.props.lastName}</span>
          </div>
        </div>
      </div>
    );
  }
}

PlayerCard.propTypes = {
  number: PropTypes.string,
  name: PropTypes.string,
  lastName: PropTypes.string,
  bck: PropTypes.string
};

export default PlayerCard;
