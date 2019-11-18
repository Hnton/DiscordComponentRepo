import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Router } from "@reach/router";
import { Home, Jeremii } from "./pages";
import Layout from "./Layout";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
    </div>
  );
}
export default () => (
  <Router>
    <Layout path="/">
      <Home path="/" />
      <Jeremii path="jeremii" />
    </Layout>
  </Router>
);
