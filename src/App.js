import React from "react";
import "./App.css";
import { Router } from "@reach/router";
import { Home, Jeremii } from "./pages";
import Layout from "./Layout";

export default () => (
  <Router>
    <Layout path="/">
      <Home path="/" />
      <Jeremii path="jeremii" />
    </Layout>
  </Router>
);
