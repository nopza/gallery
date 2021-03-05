import React from "react";
import { shallow } from "enzyme";
import GalleryEditPage from "./GalleryEditPage";

describe("GalleryEditPage", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<GalleryEditPage />);
    expect(wrapper).toMatchSnapshot();
  });
});
