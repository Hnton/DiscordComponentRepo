import React from "react";
import type { Node } from "react";

type Props = {
  children: Node
};

export default ({ children }: Props) => {
  return (
    <div>
      {/* <h4 style={h4Style}>
        <Link to="/jeremii">Home</Link>
      </h4>
      <h4 style={h4Style}>
        <Link to="/Mikael">Weather</Link>
      </h4> */}
      <main>{children}</main>
    </div>
  );
};
