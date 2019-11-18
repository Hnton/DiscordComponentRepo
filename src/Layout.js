import React, { useState, useEffect } from "react";
import type { Node } from "react";
import { Link } from "@reach/router";

type Props = {
  children: Node
};
const h4Style = {
  display: "inline-block",
  marginRight: "1em"
};

export default ({ children }: Props) => {
  return (
    <div>
      <h4 style={h4Style}>
        <Link to="/Home">Home</Link>
      </h4>
      <h4 style={h4Style}>
        <Link to="/brian">Brian</Link>
      </h4>
      <h4 style={h4Style}>
        <Link to="/hinton">Hinton</Link>
      </h4>
      <h4 style={h4Style}>
        <Link to="/jeremii">@Jeremii</Link>
      </h4>
      <main>{children}</main>
    </div>
  );
};
