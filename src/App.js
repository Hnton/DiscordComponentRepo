<<<<<<< HEAD
import React, { useState } from "react";
import moment from "moment";
import { StaticGoogleMap, Marker } from "react-static-google-map";

import { List } from "semantic-ui-react";
import { Input, Button } from "@material-ui/core";

function Discode({
  comments,
  editComment,
  state,
  setState,
  deleteComment,
  value
}) {
  return (
    <List divided relaxed>
      {comments.map(comment => {
        if (comment.id === state.commentId) {
          return (
            <List.Item style={{ marginBottom: "1em" }}>
              <List.Content>
                <List.Header as="a">
                  <Input
                    value={state.editValue}
                    onChange={event => {
                      setState({
                        ...state,
                        value: event.target.value
                      });
                    }}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={editComment}
                  >
                    Save
                  </Button>
                </List.Header>
              </List.Content>
            </List.Item>
          );
        } else if (comment.text.substr(0, 2) === "//") {
          return (
            <List.Item style={{ marginBottom: "1em" }}>
              <List.Content>
                <List.Header
                  as="a"
                  onClick={() => {
                    setState({
                      commentId: comment.id,
                      value: comment.text
                    });
                  }}
                >
                  {
                    <StaticGoogleMap
                      size="390x180"
                      className="img-fluid"
                      apiKey="AIzaSyCFZkFv8bjgP-R9-sg6fQ3mSLFEJXPI6eI"
                    >
                      <Marker
                        location={comment.text.substr(2)}
                        color="blue"
                        label="Here"
                      />
                    </StaticGoogleMap>
                  }
                </List.Header>
                <Button
                  variant="contained"
                  color="secondary"
                  size="small"
                  style={{ float: "right" }}
                  onClick={() => deleteComment(comment.id)}
                >
                  Delete
                </Button>
              </List.Content>
            </List.Item>
          );
        } else {
          return (
            <List.Item style={{ marginBottom: "1em" }}>
              <List.Content>
                <List.Header
                  as="a"
                  onClick={() => {
                    setState({
                      commentId: comment.id,
                      value: comment.text
                    });
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.65em",
                      color: "gray",
                      fontWeight: "bold"
                    }}
                  >
                    {moment(comment.time, "ss").fromNow()}
                  </span>
                  <br />
                  {comment.text}
                </List.Header>
                <Button
                  variant="contained"
                  color="secondary"
                  size="small"
                  onClick={() => deleteComment(comment.id)}
                  style={{ float: "right" }}
                >
                  Delete
                </Button>
              </List.Content>
            </List.Item>
          );
        }
      })}
    </List>
  );
}

function Jeremii() {
  const [inputText, setInputText] = useState("");
  const [state, setState] = useState({
    commentId: null,
    value: null
  });
  const [comments, setComments] = useState([
    {
      id: 1,
      text: "Oh, hai.",
      time: moment(new Date()).subtract("1", "hours")
    },
    {
      id: 2,
      text: "Oh, hei.",
      time: moment(new Date()).subtract("10", "mins")
    }
  ]);
  const checkWidget = async text => {
    setInputText(text);

    if (text.substr(0, 2) === "//") {
      //https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyBu5Lpr1d925-aXmjPKoHF5U737meWbSOg
      // 300 campus drive, parkersburg, wv
    }
    return setInputText(text);
  };
  const addComment = async e => {
    e.preventDefault();
    var coord = "";
    if (inputText.substr(0, 2) === "//") {
      var address = inputText.substr(2);
      address = address.replace(/\s/g, "+");
      //address = "1600+Amphitheatre+Parkway,+Mountain+View,+CA";
      //300+campus+drive,+parkersburg,+wv
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyCFZkFv8bjgP-R9-sg6fQ3mSLFEJXPI6eI`
      );
      const jason = await response.json();
      const lat = JSON.stringify(jason.results[0].geometry.location.lat);
      const lng = JSON.stringify(jason.results[0].geometry.location.lng);
      coord = `//${lat},${lng}`;
      //https://maps.googleapis.com/maps/api/staticmap?center=Berkeley,CA&zoom=14&size=400x400&key=
    }
    const newComment = {
      id: new Date().getMilliseconds(),
      text: coord !== "" ? coord : inputText,
      time: new Date()
    };
    setComments([...comments, newComment]);
  };
  const editComment = () => {
    const updatedComments = comments.map(comment => {
      if (comment.id === state.commentId) {
        comment.text = state.value;
        setState({
          commentId: null,
          value: null
        });
      }
      return comment;
    });

    // Update our todo state store
    setComments(updatedComments);
  };
  const deleteComment = id => {
    const newComments = comments.filter(x => x.id !== id);
    setComments(newComments);
  };
  return (
    <div>
      <div
        style={{
          width: "50%",
          margin: "0 auto",
          paddingRight: "2em",
          paddingLeft: "2em",
          borderRight: "solid 1px lightgray",
          borderLeft: "solid 1px lightgray"
        }}
      >
        <header>
          <h1 style={{ marginBottom: "0em" }}>Discord</h1>
          <h4 style={{ marginTop: "0em", color: "gray" }}>Final</h4>
        </header>
        <Discode
          deleteComment={deleteComment}
          editComment={editComment}
          comments={comments}
          state={state}
          setState={setState}
        />
        <br />
        <br />
        <form method="POST" onSubmit={addComment}>
          <Input
            style={{ width: "400px", marginRight: "1em" }}
            type="text"
            placeholder="Say something..."
            value={inputText}
            onChange={e => {
              checkWidget(e.target.value);
            }}
          />
          <Button
            variant="contained"
            color="primary"
            size="small"
            type="submit"
            style={{ float: "right" }}
          >
            Send
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Jeremii;
  
=======
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
>>>>>>> parent of a40f9871... Update
