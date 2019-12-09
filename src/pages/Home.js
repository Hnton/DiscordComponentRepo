import React, { useState } from "react";
import moment from "moment";
import { StaticGoogleMap, Marker } from "react-static-google-map";

import { List } from "semantic-ui-react";
import { Input, Button } from "@material-ui/core";

function Home() {
  const magicKey = "//";
  const magicKeyClosure = "=";
  const mapWidgetFullname = magicKey + "map" + magicKeyClosure;
  const weatherWidgetFullname = magicKey + "weather" + magicKeyClosure;

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
  const [weatherData, setWeatherData] = useState({
    temperature: null,
    city: null,
    country: null,
    humidity: null,
    description: null
  });
  // Weather Info that gets displayed to screen
  const Weather = () => (
    <div>
      {/* Displays City & Country */}
      {weatherData.city && weatherData.country && (
        <p>
          {" "}
          Location:
          <span>
            {" "}
            {weatherData.city}, {weatherData.country}
          </span>
        </p>
      )}
      {/* Displays Temperature */}
      {weatherData.temperature && (
        <p>
          {" "}
          Temperature:
          <span> {weatherData.temperature} </span>
        </p>
      )}
      {/* Displays Humidity */}
      {weatherData.humidity && (
        <p>
          {" "}
          Humidity:
          <span> {weatherData.humidity} </span>
        </p>
      )}
      {/* Displays Condition "Raining, Clear, etc..." */}
      {weatherData.description && (
        <p>
          {" "}
          Conditions:
          <span> {weatherData.description} </span>
        </p>
      )}
      {/* Displays Error Message If City or Country is does not have inpput */}
      {weatherData.error && <p>{weatherData.error}</p>}
    </div>
  );
  const WEATHER_API_KEY = "24396b8bf0c1aae21ca0fbcea7e97dff";
  const getWeather = async (city, country) => {
    const api_call = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${WEATHER_API_KEY}&units=imperial`
    );
    if (city === "" && country === "") {
      return;
    }
    const data = await api_call.json();
    console.log(data);
    setWeatherData({
      temperature: data.main.temp,
      city: data.name,
      country: data.sys.country,
      humidity: data.main.humidity,
      description: data.weather[0].description,
      error: ""
    });
  };

  const addComment = async e => {
    e.preventDefault();
    var textData = "";

    if (
      inputText.substr(0, mapWidgetFullname.length).toLowerCase() ===
      mapWidgetFullname
    ) {
      var address = inputText.substr(weatherWidgetFullname.length);
      address = address.replace(/\s/g, "+");
      //address = "1600+Amphitheatre+Parkway,+Mountain+View,+CA";
      //300+campus+drive,+parkersburg,+wv
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyCFZkFv8bjgP-R9-sg6fQ3mSLFEJXPI6eI`
      );
      const jason = await response.json();
      const lat = JSON.stringify(jason.results[0].geometry.location.lat);
      const lng = JSON.stringify(jason.results[0].geometry.location.lng);
      textData = `${mapWidgetFullname}${lat},${lng}`;
      //https://maps.googleapis.com/maps/api/staticmap?center=Berkeley,CA&zoom=14&size=400x400&key=
    }

    // WEATHER WIDGET
    //weather:new york,USA
    if (
      inputText.substr(0, weatherWidgetFullname.length).toLowerCase() ===
      weatherWidgetFullname
    ) {
      var locale = inputText.substr(weatherWidgetFullname.length);
      var city = locale.split(",")[0];
      var country = locale.split(",")[1];
      getWeather(city, country);

      textData = `${weatherWidgetFullname}${city},${country}`;
    }

    const newComment = {
      id: new Date().getMilliseconds(),
      text: textData !== "" ? textData : inputText,
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
          <h4 style={{ marginTop: "0em", color: "gray" }}>Home</h4>
        </header>
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
            } else if (
              comment.text.substr(0, mapWidgetFullname.length) ===
              mapWidgetFullname
            ) {
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
                            location={comment.text.substr(mapWidgetFullname)}
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
            } else if (
              comment.text.substr(0, weatherWidgetFullname.length) ===
              weatherWidgetFullname
            ) {
              return (
                <List.Item style={{ marginBottom: "1em" }}>
                  <List.Content>
                    <List.Header
                      as="a"
                      style={{ width: "100%" }}
                      onClick={() => {
                        setState({
                          commentId: comment.id,
                          value: comment.text
                        });
                      }}
                    >
                      <Weather
                        temperature={weatherData.temperature}
                        humidity={weatherData.humidity}
                        city={weatherData.city}
                        country={weatherData.country}
                        description={weatherData.description}
                        error={weatherData.error}
                      />
                      <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        onClick={() => deleteComment(comment.id)}
                      >
                        Delete
                      </Button>
                    </List.Header>
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
        <br />
        <br />
        <form method="POST" onSubmit={addComment}>
          <Input
            style={{ width: "75%", marginRight: "1em" }}
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

export default Home;
