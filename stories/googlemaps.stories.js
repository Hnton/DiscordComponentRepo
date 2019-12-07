import React from "react";
import { styled } from "@storybook/theming";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

export default {
  component: Input,
  title: "Input"
};

storiesOf("Input", module).add("one", () => (
  <Form>
  
  </Form><Input defaultValue="text" size={"100%"} />
));
