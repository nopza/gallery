import React from "react";
import { shallow } from "enzyme";
import SelectSearch from "./SelectSearch";

describe("SelectSearch", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<SelectSearch />);
    expect(wrapper).toMatchSnapshot();
  });
});
