import React, { useState } from "react";
import moment from "moment";

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
        }

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
  const addComment = e => {
    e.preventDefault();
    const newComment = {
      id: new Date().getMilliseconds(),
      text: inputText,
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
    <div className="App">
      <header>
        <h1>Dis-code</h1>
      </header>
      <body>
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
            onChange={e => setInputText(e.target.value)}
          />
          <Button type="submit">Send</Button>
        </form>
      </body>
    </div>
  );
}

export default Jeremii;
