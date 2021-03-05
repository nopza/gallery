import React from "react";
import { shallow } from "enzyme";
import KeywordSearch from "./KeywordSearch";

describe("KeywordSearch", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<KeywordSearch />);
    expect(wrapper).toMatchSnapshot();
  });
});
