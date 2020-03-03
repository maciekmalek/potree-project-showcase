import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Form from "./Form";
import Files from "./Files";
import ConvertedFiles from "./ConvertedFiles";

export default function Dashboard() {
  return (
    <Fragment>
      <Files />
      <Form />
      <ConvertedFiles />
    </Fragment>
  );
}
