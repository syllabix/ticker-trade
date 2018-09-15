import React from "react";
import { connect } from "react-redux";

import "./ErrorNotification.css";

const ErrorNotification = ({ hasError, message }) => (
  <span>
    {hasError ? (
      <div className="error-notification">
        <h3>{message}</h3>
      </div>
    ) : null}
  </span>
);

const mapStateToProps = state => ({
  hasError: state.error.hasError,
  message: state.error.message
});

export default connect(mapStateToProps)(ErrorNotification);
