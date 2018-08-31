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
          <div>
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
      default:
        formTemplate = null;
    }
    return formTemplate;
  };

  render() {
    return <div>{this.renderTemplate()}</div>;
  }
}

FormField.propTypes = {
  formData: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  changeHadler: PropTypes.func.isRequired,
  error: PropTypes.string
};

export default FormField;
