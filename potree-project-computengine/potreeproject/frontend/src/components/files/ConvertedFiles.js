import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { getConvertedFiles, open3DModel } from "../../actions/converter";
import { deleteConvertedFile } from "../../actions/files";
export class ConvertedFiles extends Component {
  static propTypes = {
    convertedFiles: PropTypes.array.isRequired,
    getConvertedFiles: PropTypes.func.isRequired,
    open3DModel: PropTypes.func.isRequired,
    deleteConvertedFile: PropTypes.func.isRequired
  };
  componentDidMount() {
    this.props.getConvertedFiles();
  }

  render() {
    return (
      <Fragment>
        <h2>Converted Files</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>

              <th>Date</th>

              <th />
              <th />
            </tr>
          </thead>
          <tbody>
            {this.props.convertedFiles.map(converted_file => (
              <tr key={converted_file.id}>
                <td>{converted_file.file_id}</td>
                <td>{converted_file.name}</td>

                <td>{converted_file.since_added}</td>
                <td>
                  <a href={converted_file.converted_file}>
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => {
                        this.props.open3DModel.bind(
                          this,
                          converted_file.file_id
                        );
                      }}
                    >
                      {" "}
                      POTREE
                    </button>
                  </a>
                </td>
                <td>
                  <button
                    onClick={this.props.deleteConvertedFile.bind(
                      this,
                      converted_file.file_id
                    )}
                    className="btn btn-danger btn-sm"
                  >
                    {" "}
                    Delete
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
  convertedFiles: state.convertedFiles.convertedFiles
});

export default connect(mapStateToProps, {
  getConvertedFiles,
  open3DModel,
  deleteConvertedFile
})(ConvertedFiles);
