import React, { Component } from "react";
import FormField from "../UI/formFields";
import { validate } from "../UI/misc";
import debounce from "debounce";
import { firebase } from "../../firebase";

export class Login extends Component {
  state = {
    formSuccess: "",
    formError: false,
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
      },
      password: {
        element: "input",
        value: "",
        config: {
          name: "password_input",
          type: "password",
          placeholder: "Enter your password"
        },
        validation: {
          required: true,
          minLength: 6
        }
      }
    },
    formErrors: {}
  };

  inputChangeHandler = element => {
    const newElement = { ...this.state.formData[element.id] };

    newElement.value = element.event.target.value.trim();

    this.delayedCallback(this.validateFormField, element.id);
    this.setState(prevState => ({
      formData: { ...prevState.formData, [element.id]: newElement },
      formError: false
    }));
  };

  onSubmit = event => {
    event.preventDefault();

    let data = {};
    let formValid = true;

    for (let key in this.state.formData) {
      data[key] = this.state.formData[key].value;
      formValid = this.validateFormField(key) && formValid;
    }
    if (formValid) {
      firebase
        .auth()
        .signInWithEmailAndPassword(data.email, data.password)
        .then(() => {
          this.props.history.push("/dashboard");
        })
        .catch(error => {
          this.setState({
            formError: true
          });
        });
    }
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
      <div className="container">
        <div className="signin_wrapper" style={{ margin: "100px" }}>
          <form onSubmit={this.onSubmit}>
            <h2>Please Login</h2>

            <FormField
              id={"email"}
              formData={this.state.formData.email}
              error={this.state.formErrors.email}
              changeHadler={this.inputChangeHandler}
            />

            <FormField
              id={"password"}
              formData={this.state.formData.password}
              error={this.state.formErrors.password}
              changeHadler={this.inputChangeHandler}
            />

            {this.state.formError && (
              <div className="error_label">Something is wrong, try again.</div>
            )}

            <button>Login</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
