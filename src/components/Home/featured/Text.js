import React, { Component } from "react";
import { easePolyOut } from "d3-ease";
import Animate from "react-move/Animate";
import FeaturedPlayer from "../../../Resources/images/featured_player.png";

class Text extends Component {
  animateNumber = () => (
    <Animate
      show={true}
      start={{
        opacity: 0,
        rotate: 0
      }}
      enter={{
        opacity: [1],
        rotate: [360],
        timing: { duration: 1000, ease: easePolyOut }
      }}
    >
      {({ opacity, rotate }) => {
        return (
          <div
            className="featured_number"
            style={{
              opacity,
              transform: `rotateY(${rotate}deg)`
            }}
          >
            3
          </div>
        );
      }}
    </Animate>
  );

  animateFirst = () => (
    <Animate
      show={true}
      start={{
        opacity: 0,
        x: 200
      }}
      enter={{
        opacity: [1],
        x: [0],
        timing: { duration: 1000, ease: easePolyOut }
      }}
    >
      {({ opacity, x }) => {
        return (
          <div
            className="featured_first"
            style={{
              opacity,
              transform: `translateX(${x}%)`
            }}
          >
            League
          </div>
        );
      }}
    </Animate>
  );

  animateSecond = () => (
    <Animate
      show={true}
      start={{
        opacity: 0,
        x: 200
      }}
      enter={{
        opacity: [1],
        x: [0],
        timing: { delay: 300, duration: 1000, ease: easePolyOut }
      }}
    >
      {({ opacity, x }) => {
        return (
          <div
            className="featured_second"
            style={{
              opacity,
              transform: `translateX(${x}%)`
            }}
          >
            Championships
          </div>
        );
      }}
    </Animate>
  );
  animatePlayer = () => (
    <Animate
      show={true}
      start={{
        opacity: 0
      }}
      enter={{
        opacity: [1],
        timing: { delay: 800, duration: 1000, ease: easePolyOut }
      }}
    >
      {({ opacity }) => {
        return (
          <div
            className="featured_player"
            style={{
              opacity,
              background: `url(${FeaturedPlayer})`
            }}
          />
        );
      }}
    </Animate>
  );
  render() {
    return (
      <div className="featured_text">
        {this.animatePlayer()}
        {this.animateNumber()}
        {this.animateFirst()}
        {this.animateSecond()}
      </div>
    );
  }
}

export default Text;
