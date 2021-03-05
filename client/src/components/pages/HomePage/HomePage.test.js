import React from "react";
import { shallow } from "enzyme";
import HomePage from "./HomePage";

describe("HomePage", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<HomePage />);
    expect(wrapper).toMatchSnapshot();
  });
});
