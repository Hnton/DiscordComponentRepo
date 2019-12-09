// Mikael Hinton
// API Weather Finder
// Final Project
// 12-9-2019

import React from "react";
import { Input, Button } from "@material-ui/core";
import { Link } from "@reach/router";


// API Key for OpenWeather
const API_KEY = "24396b8bf0c1aae21ca0fbcea7e97dff";

class App extends React.Component {
  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined
  }
  
//   Gets the weather from the API and if error then sets all to undefined
//      and displays ERROR message
  getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=imperial`);
    const data = await api_call.json();
    if (city && country) {
      this.setState({
        temperature: data.main.temp,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        error: ""
      });
    } else {
      this.setState({
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: "ERROR, Please have an input for both" + " City" + " and " + " Country Abbreviation",
      });
    }
  }
//   Renders the output from what city that was inputted
  render() {
    return (
       <div style={{
        width: "50%",
        margin: "0 auto",
        paddingRight: "2em",
        paddingLeft: "2em",
        borderRight: "solid 1px lightgray",
        borderLeft: "solid 1px lightgray"
      }}>
        <header>
          <h1 style={{ marginBottom: "0em" }}>Discord</h1>
          <h4 style={{ marginTop: "0em", color: "gray" }}>Weather</h4>
        </header>              
            <div>
                <Form getWeather={this.getWeather} />
                <br></br>
                <Weather 
                    temperature={this.state.temperature} 
                    humidity={this.state.humidity}
                    city={this.state.city}
                    country={this.state.country}
                    description={this.state.description}
                    error={this.state.error}
                />
            </div>
        </div>
    );
  }
};

// Form input that takes in City name and the Country the City is in
const Form = props => (
	<form onSubmit={props.getWeather}>
        {/* Input box for City */}
		<Input type="text" name="city" placeholder="City Name"/>
        {/* Input box for Country */}
		<Input type="text" name="country" placeholder="Country Abbreviation"/>
        {/* Button to get the Weather for that City */}
		<Button
        variant="contained"
        color="primary"
        size="small"
        type="submit"
        style={{ float: "Right" }}>
            Get Weather
        </Button>

        <Link to="/">
            <Button
            variant="contained"
            color="primary"
            size="small"
            type="submit"
            style={{ float: "Left" }}
            >
              Home</Button>
          </Link>
	</form>
);

// Weather Info that gets displayed to screen
const Weather = props => (
	<div>
	 {/* Displays City & Country */}
     {	
	 	props.city && props.country && <p> Location: 
	 		<span> { props.city }, { props.country }</span>
	 	</p> 
	 }
     {/* Displays Temperature */}
	 { 	
	 	props.temperature && <p> Temperature: 
	 		<span> { props.temperature }	</span>
	 	</p> 
	 }
     {/* Displays Humidity */}
	 { 	
	 	props.humidity && <p> Humidity: 
	 		<span> { props.humidity } </span>
	 	</p> 
	 }
     {/* Displays Condition "Raining, Clear, etc..." */}
	 { 	
	 	props.description && <p> Conditions: 
	 		<span> { props.description } </span>
	 </p> 
	 }
     {/* Displays Error Message If City or Country is does not have inpput */}
	 { 
	 	props.error && <p>{ props.error }</p>  
	 }
	</div>
);

export default App;