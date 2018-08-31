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

export const isEmpty = value =>
  value === undefined ||
  value === null ||
  (typeof value === "object" && Object.keys(value).length === 0) ||
  (typeof value === "string" && value.trim().length === 0);

export const validate = (key, element) => {
  let errors = {};

  if (element.validation.email) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const valid = re.test(element.value);
    const message = `${!valid ? "Must be a valid email" : ""}`;
    !valid && (errors.email = message);
  }

  if (element.validation.required) {
    const valid = element.value !== "";
    const message = `${!valid ? "This field is required" : ""}`;
    !valid && (errors[key] = message);
  }

  const valid = isEmpty(errors);

  return { valid, errors };
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
