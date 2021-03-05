import React from "react";
import { shallow } from "enzyme";
import RegisterPage from "./RegisterPage";

describe("RegisterPage", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<RegisterPage />);
    expect(wrapper).toMatchSnapshot();
  });
});
