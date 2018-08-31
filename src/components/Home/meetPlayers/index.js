import React, { Component } from "react";
import Stripes from "../../../Resources/images/stripes.png";
import { Tag } from "../../UI/misc";
import Reveal from "react-reveal/Reveal";
import Homecards from "./cards";

export class MeetPlayers extends Component {
  state = {
    show: false
  };

  tagOptions = {
    bck: "#0e1731",
    size: "100px",
    add: {
      marginBottom: "20px"
    }
  };

  onReveal = () => {
    this.setState({ show: true });
  };

  render() {
    return (
      <Reveal onReveal={this.onReveal} fraction={0.7}>
        <div
          className="home_meetplayers"
          style={{ background: `#fff url(${Stripes})` }}
        >
          <div className="container">
            <div className="home_meetplayers_wrapper">
              <div className="home_card_wrapper">
                <Homecards show={this.state.show} />
              </div>
              <div className="home_text_wrapper">
                <div>
                  <Tag {...this.tagOptions}>Meet</Tag>
                </div>
                <div>
                  <Tag {...this.tagOptions}>The</Tag>
                </div>
                <div>
                  <Tag {...this.tagOptions}>Players</Tag>
                </div>
                <div>
                  <Tag
                    bck="#ffffff"
                    size="27px"
                    color="#0e1731"
                    link={true}
                    linkTo="/the_team"
                    add={{
                      marginBottom: "27px",
                      border: "1px solid #0e1731"
                    }}
                  >
                    Meet them here
                  </Tag>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    );
  }
}

export default MeetPlayers;
