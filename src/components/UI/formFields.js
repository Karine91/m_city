import React, { Component } from "react";
import PropTypes from "prop-types";

class FormField extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onChange = event => {
    this.props.changeHadler({ event, id: this.props.id });
  };

  renderTemplate = () => {
    let formTemplate;

    switch (this.props.formData.element) {
      case "input":
        formTemplate = (
          <div className="form_field">
            {this.props.formData.config.label && (
              <label className="label_inputs">
                {this.props.formData.config.label}
              </label>
            )}
            <input
              {...this.props.formData.config}
              value={this.props.formData.value}
              onChange={this.onChange}
            />
            {this.props.error && (
              <div className="error_label">{this.props.error}</div>
            )}
          </div>
        );
        break;
      case "select":
        formTemplate = (
          <div className="form_field">
            {this.props.formData.config.label && (
              <label className="label_inputs">
                {this.props.formData.config.label}
              </label>
            )}
            <select value={this.props.formData.value} onChange={this.onChange}>
              <option value="null">Select One</option>
              {this.props.formData.config.options.map(option => (
                <option key={option.value} value={option.value}>
                  {option.title}
                </option>
              ))}
            </select>
            {this.props.error && (
              <div className="error_label">{this.props.error}</div>
            )}
          </div>
        );
        break;
      default:
        formTemplate = null;
    }
    return formTemplate;
  };

  render() {
    return this.renderTemplate();
  }
}

FormField.propTypes = {
  formData: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  changeHadler: PropTypes.func.isRequired,
  error: PropTypes.string
};

export default FormField;
