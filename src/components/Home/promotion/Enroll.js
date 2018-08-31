import React, { Component } from "react";
import Fade from "react-reveal/Fade";
import FormField from "../../UI/formFields";
import { validate, isEmpty } from "../../UI/misc";

class Enroll extends Component {
  state = {
    formError: false,
    formSuccess: "",
    formData: {
      email: {
        element: "input",
        value: "",
        config: {
          name: "email_input",
          type: "email",
          placeholder: "Enter your email"
        },
        validation: {
          required: true,
          email: true
        }
      }
    },
    formErrors: {}
  };

  onSubmit = e => {
    e.preventDefault();

    let data = {};
    let formValid = true;

    for (let key in this.state.formData) {
      data[key] = this.state.formData[key].value;
      formValid = this.validateFormField(key) && formValid;
    }
    if (formValid) {
      console.log(data);
    }
  };

  inputChangeHandler = element => {
    const newElement = { ...this.state.formData[element.id] };

    newElement.value = element.event.target.value.trim();

    this.validateFormField(element.id);
    this.setState(prevState => ({
      formData: { ...prevState.formData, [element.id]: newElement }
    }));
  };

  validateFormField = elementId => {
    let { valid, errors } = validate(elementId, this.state.formData[elementId]);

    this.setState(prevState => ({
      formErrors: { ...prevState.formErrors, [elementId]: errors[elementId] }
    }));
    return valid;
  };

  render() {
    return (
      <Fade>
        <div className="enroll_wrapper">
          <form onSubmit={this.onSubmit} noValidate>
            <div className="enroll_title">Enter your email</div>
            <div className="enroll_input">
              <FormField
                id={"email"}
                formData={this.state.formData.email}
                error={this.state.formErrors.email}
                changeHadler={this.inputChangeHandler}
              />
              <button>Enroll</button>
            </div>
          </form>
        </div>
      </Fade>
    );
  }
}

export default Enroll;
