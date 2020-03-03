import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { postFile } from "../../actions/files";
export class Files extends Component {
  state = {
    selectedFile: null,
    inputKey: Date.now()
  };

  static propTypes = {
    postFile: PropTypes.func.isRequired
  };
  fileSelectedHandler = e => {
    this.setState({
      selectedFile: e.target.files[0]
    });
    console.log(e.target.files[0]);
  };

  fileUploadHandler = e => {
    // e.preventDefault();
    const data = new FormData();
    data.append("file", this.state.selectedFile, this.state.selectedFile.name);
    this.props.postFile(data);
    console.log("yo");
  };

  fileCleaner = () => {
    this.setState({
      selectedFile: null,
      inputKey: Date.now()
    });

    if (this.props.onChange) this.props.onChange(null);
  };

  render() {
    return (
      <div>
        <input
          type="file"
          key={this.state.inputKey}
          onChange={this.fileSelectedHandler}
        ></input>
        <button
          onClick={() => {
            this.fileUploadHandler();
            this.fileCleaner();
          }}
        >
          Upload
        </button>
      </div>
    );
  }
}

export default connect(
  null,
  { postFile }
)(Files);
