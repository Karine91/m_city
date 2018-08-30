import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export const Tag = props => {
  const template = (
    <div
      style={{
        background: props.bck,
        display: "inline-block",
        fontSize: props.size,
        color: props.color,
        padding: props.padding,
        fontFamily: props.fontFamily,
        ...props.add
      }}
    >
      {props.children}
    </div>
  );

  if (props.link) {
    return <Link to={props.linkTo}>{template}</Link>;
  } else {
    return template;
  }
};

export const firebaseLooper = snapshot => {
  const data = [];
  snapshot.forEach(child => {
    data.push({
      id: child.key,
      ...child.val()
    });
  });

  return data;
};

export const reverseArray = arr => {
  return arr.reduceRight((acc, next) => [...acc, next], []);
};

Tag.defaultProps = {
  size: "1rem",
  color: "#ffffff",
  padding: "5px 10px",
  fontFamily: "Righteous"
};

Tag.propTypes = {
  bck: PropTypes.string,
  size: PropTypes.string,
  color: PropTypes.string,
  padding: PropTypes.string,
  fontFamily: PropTypes.string
};
