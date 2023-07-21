import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import AdminHome from "@/app/(pages)/admin/(other)/(top)/page";
import React from "react";
import "@testing-library/jest-dom";
import { dataArray } from "@/const/adminTop";

const user = userEvent.setup();
describe("adminトップページのテスト", () => {
  beforeEach(() => {
    render(<AdminHome />);
  });
  it("スナップショット", async () => {
    const { container } = render(<AdminHome />);
    expect(container).toMatchSnapshot();
  });

  it("データとメニューの数が等しい", async () => {
    const menuComponents = screen.getAllByTestId("menu_link");
    // console.log(menuComponents.length);
    expect(menuComponents.length).toBe(dataArray.length);
  });
  it("メニューが正しく表示される", () => {
    const title = screen.getByText(dataArray[0].title);
    const url = document.querySelector(`a[href="${dataArray[0].url}"]`);
    const description = screen.getByText(dataArray[0].description);
    const img = document.querySelector("img");
    // console.log(img);
    const imgAlt = img?.getAttribute("alt");
    // console.log(imgAlt);
    const imgUrl = img?.getAttribute("src");
    // console.log(imgUrl);

    expect(title).toBeInTheDocument();
    expect(url).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(imgAlt).toContain(dataArray[0].imgAlt);
    expect(imgUrl).toContain("document_icon.png");
  });

  it("メニュークリックでページ遷移", () => {
    const menu = document.querySelector(
      `a[href="${dataArray[0].url}"]`
    ) as HTMLElement;
    // console.log(menu);
    user.click(menu);
    expect(menu).toHaveAttribute("href", "/admin/handle-question");
  });
});
