import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import mcityLogo from "../../Resources/images/logos/manchester_city_logo.png";

export const CityLogo = props => {
  const template = (
    <div
      className="img_cover"
      style={{
        width: props.width,
        height: props.height,
        background: `url(${mcityLogo}) no-repeat`
      }}
    />
  );

  if (props.link) {
    return (
      <Link to={props.linkTo} className="link_logo">
        {template}
      </Link>
    );
  } else {
    return template;
  }
};

CityLogo.propTypes = {
  linkTo: PropTypes.string,
  link: PropTypes.bool,
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired
};
