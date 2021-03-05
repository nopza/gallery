import React from "react";
import { shallow } from "enzyme";
import GalleryViewPage from "./GalleryViewPage";

describe("GalleryViewPage", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<GalleryViewPage />);
    expect(wrapper).toMatchSnapshot();
  });
});
