import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import PotreeEngine from "../engine/PotreeEngine";

export default function PotreeViewer() {
  return (
    <Fragment>
      <PotreeEngine />
    </Fragment>
  );
}
