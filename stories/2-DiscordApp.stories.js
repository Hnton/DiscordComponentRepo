import React from 'react';
import { action } from '@storybook/addon-actions';
import { Button } from '@storybook/react/demo';
import { Input, Divider } from 'semantic-ui-react';


export default {
  title: 'Discord',
};

export const DiscordWeather = () => 
<form>
<Input
  style={{ width: "75%", marginRight: "1em" }}
  type="text"
  placeholder="Say something..."
  value="//weather=New York"
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
</form>;

export const OutputWeather = () =>
<div>
    Location: New York
    <br/> 
    Temperature: 50000
    <br/>
    Humidity: 100
    <br/>
    Conditions: Rainy
</div>;

export const DiscordMap = () => 
<form>
<Input
  style={{ width: "75%", marginRight: "1em" }}
  type="text"
  placeholder="Say something..."
  value="//map=New York"
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
</form>;

export const OutputMap = () =>
<div>
<img src="./stories/Capture.PNG"></img>
</div>;