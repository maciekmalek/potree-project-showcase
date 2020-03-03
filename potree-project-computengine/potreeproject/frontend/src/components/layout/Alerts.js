import React, { Component, Fragment } from "react";
import { withAlert } from "react-alert";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export class Alerts extends Component {
  static propTypes = {
    error: PropTypes.object.isRequired,
    message: PropTypes.object.isRequired
  };
  componentDidUpdate(prevProps) {
    //TODO -- further implementation later / 20 min
    const { error, alert, message } = this.props;

    if (error !== prevProps.error) {
      if (error.msg.username)
        alert.error(`USERNAME: ${error.msg.username.join()}`);
      if (error.msg.non_field_errors)
        alert.error(error.msg.non_field_errors.join());
      if (error.msg.password)
        alert.error(`PASSWORD: ${error.msg.password.join()}`);
      if (error.msg.username)
        alert.error(`USERNAME: ${error.msg.username.join()}`);
      if (error.msg.name)
        alert.error(`CONVERSION ERROR: ${error.msg.name} FILE`);
    }

    if (message !== prevProps.message) {
      if (message.deletedFile) alert.success(message.deletedFile);
      if (message.addedFile) alert.success(message.addedFile);
      if (message.convertedFile) alert.success(message.convertedFile);
      if (message.passwordsNotMatch) alert.error(message.passwordsNotMatch);
      if (message.deletedConvertedFile)
        alert.success(message.deletedConvertedFile);
    }
  }
  render() {
    return <Fragment />;
  }
}

const mapStateToProps = state => ({
  error: state.errors,
  message: state.messages
});

export default connect(mapStateToProps)(withAlert()(Alerts));
