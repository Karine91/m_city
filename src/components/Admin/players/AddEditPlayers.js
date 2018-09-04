import React, { Component } from "react";
import AdminLayout from "../../../hoc/AdminLayout";
import FormField from "../../UI/formFields";
import { validate } from "../../UI/misc";
import debounce from "debounce";
import { firebasePlayers, firebaseDB, firebase } from "../../../firebase";
import FileUploader from "../../UI/fileuploader";
import CircularProgress from "@material-ui/core/CircularProgress";

export class AddEditPlayer extends Component {
  state = {
    playerId: "",
    formType: "",
    formError: false,
    formSuccess: "",
    defaultImg: "",
    formData: {
      name: {
        element: "input",
        value: "",
        config: {
          name: "name_input",
          type: "text",
          label: "Player name"
        },
        validation: {
          required: true
        }
      },
      lastname: {
        element: "input",
        value: "",
        config: {
          name: "lastname_input",
          type: "text",
          label: "Player Last Name"
        },
        validation: {
          required: true
        }
      },
      number: {
        element: "input",
        value: "",
        config: {
          name: "number_input",
          type: "text",
          label: "Player Number"
        },
        validation: {
          required: true
        }
      },
      position: {
        element: "select",
        value: "",
        config: {
          name: "select_position",
          label: "Select a position",
          options: [
            { value: "Keeper", title: "Keeper" },
            { value: "Defence", title: "Defence" },
            { value: "Midfield", title: "Midfiled" },
            { value: "Striker", title: "Striker" }
          ]
        },
        validation: {
          required: true
        }
      },
      image: {
        element: "image",
        value: "",
        validation: {
          required: true
        }
      }
    },
    formErrors: {},
    isLoading: false
  };

  componentDidMount() {
    const playerId = this.props.match.params.id;
    if (!playerId) {
      this.setState({
        formType: "Add Player"
      });
    } else {
      this.setState({
        isLoading: true
      });
      firebaseDB
        .ref(`players/${playerId}`)
        .once("value")
        .then(snapshot => {
          const playerData = snapshot.val();

          firebase
            .storage()
            .ref("players")
            .child(playerData.image)
            .getDownloadURL()
            .then(url => {
              this.updateFields(playerData, "Edit Player", playerId, url);
            })
            .catch(err => {
              this.updateFields(playerData, "Edit Player", playerId, "");
            });
        });
    }
  }

  updateFields = (player, type, playerId, url) => {
    const newFormData = { ...this.state.formData };

    for (let key in newFormData) {
      if (player) {
        newFormData[key].value = player[key];
      }
    }

    this.setState({
      playerId,
      formType: type,
      formData: newFormData,
      defaultImg: url,
      defaultImgName: player.image,
      isLoading: false
    });
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
      if (this.state.playerId) {
        firebaseDB
          .ref(`players/${this.state.playerId}`)
          .update(data)
          .then(() => {
            this.successForm("Updated correctly");
          })
          .catch(err => {
            console.log(err);
            this.setState({ formError: true });
          });
      } else {
        firebasePlayers
          .push(data)
          .then(() => {
            this.props.history.push("/admin_players");
          })
          .catch(err => {
            this.setState({ formError: true });
          });
      }
    }
  };

  successForm = msg => {
    this.setState({
      formSuccess: msg
    });

    setTimeout(() => {
      this.setState({
        formSuccess: ""
      });
    }, 2000);
  };

  inputChangeHandler = (element, content = "") => {
    const newElement = { ...this.state.formData[element.id] };
    if (!content) {
      newElement.value = element.event.target.value;
    } else {
      newElement.value = content;
    }

    this.delayedCallback(this.validateFormField, element.id);
    this.setState(prevState => ({
      formData: { ...prevState.formData, [element.id]: newElement },
      formError: false
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

  resetImage = () => {
    const newFormData = { ...this.state.formData };
    newFormData.image.value = "";
    this.setState({
      formData: newFormData
    });
  };

  storeFilename = filename => {
    this.inputChangeHandler({ id: "image" }, filename);
  };

  render() {
    return (
      <AdminLayout>
        {this.state.isLoading ? (
          <div
            className="progress"
            style={{
              justifyContent: "center",
              margin: "30px 0",
              height: "100%",
              display: "flex",
              alignItems: "center"
            }}
          >
            <CircularProgress
              style={{
                color: "#98c6e9"
              }}
              thickness={7}
            />
          </div>
        ) : (
          <div className="editplayers_dialog_wrapper">
            <h2>{this.state.formType}</h2>
            <form onSubmit={this.onSubmit}>
              <FileUploader
                dir="players"
                tag="Player image"
                defaultImg={this.state.defaultImg}
                defaultImgName={this.state.formData.image.value}
                resetImage={this.resetImage}
                filename={this.storeFilename}
                error={this.state.formErrors.image}
                key={this.state.playerId}
              />

              <FormField
                id={"name"}
                formData={this.state.formData.name}
                error={this.state.formErrors.name}
                changeHadler={this.inputChangeHandler}
              />

              <FormField
                id={"lastname"}
                formData={this.state.formData.lastname}
                error={this.state.formErrors.lastname}
                changeHadler={this.inputChangeHandler}
              />

              <FormField
                id={"number"}
                formData={this.state.formData.number}
                error={this.state.formErrors.number}
                changeHadler={this.inputChangeHandler}
              />

              <FormField
                id={"position"}
                formData={this.state.formData.position}
                error={this.state.formErrors.position}
                changeHadler={this.inputChangeHandler}
              />

              {this.state.formSuccess && (
                <div className="success_label">{this.state.formSuccess}</div>
              )}

              {this.state.formError && (
                <div className="error_label">
                  Something is wrong, try again.
                </div>
              )}
              <div className="admin_submit">
                <button>{this.state.formType}</button>
              </div>
            </form>
          </div>
        )}
      </AdminLayout>
    );
  }
}

export default AddEditPlayer;
