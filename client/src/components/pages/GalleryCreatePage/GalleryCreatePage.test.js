import React from "react";
import { shallow } from "enzyme";
import GalleryCreatePage from "./GalleryCreatePage";

describe("GalleryCreatePage", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<GalleryCreatePage />);
    expect(wrapper).toMatchSnapshot();
  });
});
