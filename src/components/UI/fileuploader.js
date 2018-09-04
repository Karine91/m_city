import React, { Component } from "react";
import { firebase } from "../../firebase";
import FileUploader from "react-firebase-file-uploader";
import CircularProgress from "@material-ui/core/CircularProgress";
import PropTypes from "prop-types";

export class Fileuploader extends Component {
  state = {
    name: this.props.defaultImgName,
    isUploading: false,
    fileURL: this.props.defaultImg
  };

  handleUploadStart = () => {
    this.setState({
      isUploading: true
    });
  };

  handleUploadError = () => {
    this.setState({
      isUploading: false
    });
  };

  handleUploadSuccess = filename => {
    firebase
      .storage()
      .ref(this.props.dir)
      .child(filename)
      .getDownloadURL()
      .then(url => {
        this.setState({
          fileURL: url,
          name: filename,
          isUploading: false
        });
      });

    this.props.filename(filename);
  };

  uploadAgain = () => {
    firebase
      .storage()
      .ref(this.props.dir)
      .child(this.state.name)
      .delete()
      .then(() => {
        // File deleted successfully
      })
      .catch(error => {
        // Uh-oh, an error occurred!
        console.log(error);
      });
    this.setState({
      name: this.props.defaultImgName,
      isUploading: false,
      fileURL: this.props.defaultImg
    });
    this.props.resetImage();
  };

  render() {
    return (
      <div>
        {!this.state.fileURL && (
          <div>
            <div className="label_inputs">{this.props.tag}</div>
            <FileUploader
              accept="image/*"
              name="image"
              randomizeFilename
              storageRef={firebase.storage().ref(this.props.dir)}
              onUploadStart={this.handleUploadStart}
              onUploadError={this.handleUploadError}
              onUploadSuccess={this.handleUploadSuccess}
            />
            {this.state.isUploading && (
              <div
                className="progress"
                style={{
                  textAlign: "center",
                  margin: "30px 0"
                }}
              >
                <CircularProgress
                  style={{
                    color: "#98c6e9"
                  }}
                  thickness={7}
                />
              </div>
            )}
          </div>
        )}
        {this.state.fileURL &&
          !this.isUploading && (
            <div className="image_upload_container">
              <img
                style={{
                  width: "100%"
                }}
                src={this.state.fileURL}
                alt={this.state.name}
              />

              <div className="remove" onClick={this.uploadAgain}>
                Remove
              </div>
            </div>
          )}
        {this.props.error && (
          <div className="error_label">{this.props.error}</div>
        )}
      </div>
    );
  }
}

Fileuploader.propTypes = {
  error: PropTypes.string,
  dir: PropTypes.string.isRequired,
  tag: PropTypes.string,
  defaultImgName: PropTypes.string,
  defaultImg: PropTypes.string
};

export default Fileuploader;
