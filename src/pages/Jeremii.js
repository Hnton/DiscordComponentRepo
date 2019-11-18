import React, { useState } from "react";
import moment from "moment";
import { StaticGoogleMap, Marker, Path } from "react-static-google-map";

import { Button, Input, List } from "semantic-ui-react";

function Discode({ comments, editComment, state, setState, deleteComment }) {
  return (
    <List divided relaxed>
      {comments.map(comment => {
        if (comment.id === state.commentId) {
          return (
            <List.Item>
              <List.Content>
                <List.Header as="a">
                  <Input
                    value={state.editValue}
                    onChange={(event, { value }) => {
                      setState({
                        ...state,
                        value: value
                      });
                    }}
                  />
                  <Button primary onClick={editComment}>
                    Save
                  </Button>
                </List.Header>
              </List.Content>
            </List.Item>
          );
        } else if (comment.text.substr(0, 2) === "//") {
          return (
            <List.Item>
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
                      size="320x160"
                      className="img-fluid"
                      apiKey="AIzaSyCFZkFv8bjgP-R9-sg6fQ3mSLFEJXPI6eI"
                    >
                      <Marker
                        location={comment.text.substr(2)}
                        color="blue"
                        label="P"
                      />
                    </StaticGoogleMap>
                  }
                </List.Header>
                <Button primary onClick={() => deleteComment(comment.id)}>
                  Delete
                </Button>
              </List.Content>
            </List.Item>
          );
        } else {
          return (
            <List.Item>
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
                  {comment.text + " " + moment(comment.time, "ss").fromNow()}
                </List.Header>
                <Button primary onClick={() => deleteComment(comment.id)}>
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
      text = text.replace(/\s/g, "+");
    }
    return setInputText(text);
  };
  const addComment = async e => {
    e.preventDefault();
    var coord = "";
    if (inputText.substr(0, 2) === "//") {
      var address = inputText.substr(2);
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
      text: coord,
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
      <header>
        <h1>Discord</h1>
      </header>
      <Discode
        deleteComment={deleteComment}
        editComment={editComment}
        comments={comments}
        state={state}
        setState={setState}
      />
      <form method="POST" onSubmit={addComment}>
        <input
          type="text"
          placeholder="Say something..."
          value={inputText}
          onChange={e => {
            checkWidget(e.target.value);
          }}
        />
        <Button type="submit">Send</Button>
      </form>
    </div>
  );
}

export default Jeremii;
