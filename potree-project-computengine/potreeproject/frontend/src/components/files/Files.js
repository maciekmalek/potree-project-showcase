import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getFiles, deleteFile } from "../../actions/files";
import { convertFile } from "../../actions/converter";
export class Files extends Component {
  static propTypes = {
    files: PropTypes.array.isRequired,
    getFiles: PropTypes.func.isRequired,
    deleteFile: PropTypes.func.isRequired,
    convertFile: PropTypes.func.isRequired
  };
  componentDidMount() {
    this.props.getFiles();
  }

  render() {
    return (
      <Fragment>
        <h2> Files</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>File Type</th>
              <th>Size</th>
              <th>Date</th>
              <th />
              <th />
            </tr>
          </thead>
          <tbody>
            {this.props.files.map(file => (
              <tr key={file.id}>
                <td>{file.file_id}</td>
                <td>{file.name}</td>
                <td>{file.filetype}</td>
                <td>{file.size}</td>
                <td>{file.since_added}</td>
                <td>
                  <button
                    onClick={this.props.deleteFile.bind(this, file.file_id)}
                    className="btn btn-danger btn-sm"
                  >
                    {" "}
                    Delete
                  </button>
                </td>
                <td>
                  <button
                    onClick={this.props.convertFile.bind(this, file.file_id)}
                    className="btn btn-warning btn-sm"
                  >
                    {" "}
                    Convert
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  files: state.files.files
});

export default connect(mapStateToProps, { getFiles, deleteFile, convertFile })(
  Files
);
