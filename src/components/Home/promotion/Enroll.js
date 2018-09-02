import React, { Component } from "react";
import Fade from "react-reveal/Fade";
import FormField from "../../UI/formFields";
import { validate } from "../../UI/misc";
import debounce from "debounce";

import { firebasePromotions } from "../../../firebase";

class Enroll extends Component {
  state = {
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
      firebasePromotions
        .orderByChild("email")
        .equalTo(data.email)
        .once("value")
        .then(snapshot => {
          if (snapshot.val()) {
            this.resetFormSuccess(false);
          } else {
            firebasePromotions.push(data);
            this.resetFormSuccess(true);
          }
        });
    }
  };

  resetFormSuccess = type => {
    const newFormData = { ...this.state.formData };
    for (let key in newFormData) {
      newFormData[key].value = "";
    }

    this.setState({
      formErrors: {},
      formData: newFormData,
      formSuccess: type ? "Congratulations!" : "This email is already exists."
    });
    this.succesMessage();
  };

  succesMessage = () => {
    setTimeout(() => {
      this.setState({
        formSuccess: ""
      });
    }, 2000);
  };

  inputChangeHandler = element => {
    const newElement = { ...this.state.formData[element.id] };

    newElement.value = element.event.target.value;

    this.delayedCallback(this.validateFormField, element.id);
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

  delayedCallback = debounce(function(fn, ...rest) {
    fn.apply(this, rest);
  }, 250);

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
              {this.state.formSuccess && (
                <div className="success_label">{this.state.formSuccess}</div>
              )}
              <button>Enroll</button>
              <div className="enroll_discl">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Dolores, laborum quaerat aperiam.
              </div>
            </div>
          </form>
        </div>
      </Fade>
    );
  }
}

export default Enroll;
