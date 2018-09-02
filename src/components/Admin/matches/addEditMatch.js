import React, { Component } from "react";
import AdminLayout from "../../../hoc/AdminLayout";
import FormField from "../../UI/formFields";
import { validate } from "../../UI/misc";
import debounce from "debounce";
import { firebaseMatches, firebaseDB, firebaseTeams } from "../../../firebase";
import { firebaseLooper } from "../../UI/misc";

export class AddEditMatch extends Component {
  state = {
    matchId: "",
    formType: "",
    formError: false,
    formSuccess: "",
    teams: [],
    formData: {
      date: {
        element: "input",
        value: "",
        config: {
          label: "Event date",
          name: "date_input",
          type: "date"
        },
        validation: {
          required: true
        }
      },
      local: {
        element: "select",
        value: "",
        config: {
          name: "select_local",
          options: []
        },
        validation: {
          required: true
        }
      },
      resultLocal: {
        element: "input",
        value: "",
        config: {
          name: "result_local_input",
          type: "text"
        },
        validation: {
          required: true
        }
      },
      away: {
        element: "select",
        value: "",
        config: {
          name: "select_away",
          options: []
        },
        validation: {
          required: true
        }
      },
      resultAway: {
        element: "input",
        value: "",
        config: {
          name: "result_away_input",
          type: "text"
        },
        validation: {
          required: true
        }
      },
      referee: {
        element: "input",
        value: "",
        config: {
          label: "Referee",
          name: "referee_input",
          type: "text"
        },
        validation: {
          required: true
        }
      },
      stadium: {
        element: "input",
        value: "",
        config: {
          label: "Stadium",
          name: "stadium_input",
          type: "text"
        },
        validation: {
          required: true
        }
      },
      result: {
        element: "select",
        value: "",
        config: {
          label: "Team result",
          name: "select_result",
          options: [
            { value: "W", title: "W" },
            { value: "L", title: "L" },
            { value: "D", title: "D" },
            { value: "n/a", title: "n/a" }
          ]
        },
        validation: {
          required: true
        }
      },
      final: {
        element: "select",
        value: "",
        config: {
          label: "Game played?",
          name: "select_played",
          options: [
            { value: "Yes", title: "Yes" },
            { value: "No", title: "No" }
          ]
        },
        validation: {
          required: true
        }
      }
    },
    formErrors: {}
  };

  componentDidMount() {
    const matchId = this.props.match.params.id;
    if (!matchId) {
      this.getTeams(false, "Add Match", false);
    } else {
      firebaseDB
        .ref(`matches/${matchId}`)
        .once("value")
        .then(snapshot => {
          const match = snapshot.val();
          this.getTeams(match, "Edit Match", matchId);
        });
    }
  }

  getTeams = (match, type, matchId) => {
    firebaseTeams.once("value").then(snapshot => {
      const teams = firebaseLooper(snapshot);
      const teamOptions = teams.map(item => ({
        value: item.shortName,
        title: item.shortName
      }));
      this.updateFields(match, teamOptions, teams, type, matchId);
    });
  };

  updateFields = (match, teamOptions, teams, type, matchId) => {
    const newFormData = { ...this.state.formData };

    for (let key in newFormData) {
      if (match) {
        newFormData[key].value = match[key];
      }

      if (key === "local" || key === "away") {
        newFormData[key].config.options = teamOptions;
      }
    }

    this.setState({
      matchId,
      formType: type,
      formData: newFormData,
      teams
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

    if (!this.state.matchId) {
      this.state.teams.forEach(team => {
        if (team.shortName === data.local) {
          data["localThmb"] = team.thmb;
        }

        if (team.shortName === data.away) {
          data["awayThmb"] = team.thmb;
        }
      });
    }

    if (formValid) {
      if (this.state.matchId) {
        firebaseDB
          .ref(`matches/${this.state.matchId}`)
          .update(data)
          .then(() => {
            this.successForm("Updated correctly");
          })
          .catch(err => {
            this.setState({ formError: true });
          });
      } else {
        firebaseMatches
          .push(data)
          .then(() => {
            this.props.history.push("/admin_matches");
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

  inputChangeHandler = element => {
    const newElement = { ...this.state.formData[element.id] };

    newElement.value = element.event.target.value;

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

  render() {
    return (
      <AdminLayout>
        <div className="editmatch_dialog_wrapper">
          <h2>{this.state.formType}</h2>
          <form onSubmit={this.onSubmit}>
            <FormField
              id={"date"}
              formData={this.state.formData.date}
              error={this.state.formErrors.date}
              changeHadler={this.inputChangeHandler}
            />
            <div className="select_team_layout">
              <label className="label_inputs">Local</label>
              <div className="wrapper">
                <div className="left">
                  <FormField
                    id={"local"}
                    formData={this.state.formData.local}
                    error={this.state.formErrors.local}
                    changeHadler={this.inputChangeHandler}
                  />
                </div>
                <div className="right">
                  <FormField
                    id={"resultLocal"}
                    formData={this.state.formData.resultLocal}
                    error={this.state.formErrors.resultLocal}
                    changeHadler={this.inputChangeHandler}
                  />
                </div>
              </div>
            </div>
            <div className="select_team_layout">
              <label className="label_inputs">Away</label>
              <div className="wrapper">
                <div className="left">
                  <FormField
                    id={"away"}
                    formData={this.state.formData.away}
                    error={this.state.formErrors.away}
                    changeHadler={this.inputChangeHandler}
                  />
                </div>
                <div className="right">
                  <FormField
                    id={"resultAway"}
                    formData={this.state.formData.resultAway}
                    error={this.state.formErrors.resultAway}
                    changeHadler={this.inputChangeHandler}
                  />
                </div>
              </div>
            </div>
            <div className="split_fields">
              <FormField
                id={"referee"}
                formData={this.state.formData.referee}
                error={this.state.formErrors.referee}
                changeHadler={this.inputChangeHandler}
              />
              <FormField
                id={"stadium"}
                formData={this.state.formData.stadium}
                error={this.state.formErrors.stadium}
                changeHadler={this.inputChangeHandler}
              />
            </div>
            <div className="split_fields last">
              <FormField
                id={"result"}
                formData={this.state.formData.result}
                error={this.state.formErrors.result}
                changeHadler={this.inputChangeHandler}
              />
              <FormField
                id={"final"}
                formData={this.state.formData.final}
                error={this.state.formErrors.final}
                changeHadler={this.inputChangeHandler}
              />
            </div>
            {this.state.formSuccess && (
              <div className="success_label">{this.state.formSuccess}</div>
            )}

            {this.state.formError && (
              <div className="error_label">Something is wrong, try again.</div>
            )}
            <div className="admin_submit">
              <button>{this.state.formType}</button>
            </div>
          </form>
        </div>
      </AdminLayout>
    );
  }
}

export default AddEditMatch;
