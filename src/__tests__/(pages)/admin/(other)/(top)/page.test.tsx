import userEvent from "@testing-library/user-event";
import { render, screen, waitFor } from "@testing-library/react";
import AdminHome from "@/app/(pages)/admin/(other)/(top)/page";
import React from "react";
import "@testing-library/jest-dom";
import { dataArray } from "@/const/adminTop";
import { adminMenuMock } from "./adminMenuMock";
import { act } from "react-dom/test-utils";

// describe("管理者トップページのテスト", () => {
//   global.fetch = jest.fn(() =>
//     Promise.resolve({
//       json: () => Promise.resolve(adminMenuMock),
//     })
//   );

//   it("スナップショット", () => {
//     const { container } = render(<AdminHome />);
//     expect(container).toMatchSnapshot();
//   });
// });

describe("adminトップページのテスト", () => {
  const user = userEvent.setup();
  // beforeEach(() => {
  const mockFetchPromise = Promise.resolve({
    ok: true,
    json: () => Promise.resolve(adminMenuMock),
  });
  global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);
  it("データ取得が成功し、画面に表示されることを確認", async () => {
    await act(() => render(<AdminHome />));

    await waitFor(() => {
      expect(screen.getByTestId("menu_link_1")).toBeInTheDocument();
    });
  });

  // afterEach(() => {
  //   jest.restoreAllMocks();
  // });

  it("スナップショット", async () => {
    const { container } = render(<AdminHome />);
    expect(container).toMatchSnapshot();
  });

  // it("メニューが正しく表示される", async () => {
  //   await waitFor(() => {
  //     expect(screen.getByText("タスクの一覧")).toBeInTheDocument();
  //   const title = screen.getByText(dataArray[0].title);
  //   const url = document.querySelector(`a[href="${dataArray[0].url}"]`);
  //   const description = screen.getByText(dataArray[0].description);
  //   const img = document.querySelector("img");
  //   // console.log(img);
  //   const imgAlt = img?.getAttribute("alt");
  //   // console.log(imgAlt);
  //   const imgUrl = img?.getAttribute("src");
  //   // console.log(imgUrl);
  //   expect(title).toBeInTheDocument();
  //   expect(url).toBeInTheDocument();
  //   expect(description).toBeInTheDocument();
  //   expect(imgAlt).toContain(dataArray[0].imgAlt);
  //   expect(imgUrl).toContain("document_icon.png");
  // });
  // });

  // it("データとメニューの数が等しい", async () => {
  //   const menuComponents = screen.getAllByTestId("menu_link");
  //   // console.log(menuComponents.length);
  //   expect(menuComponents.length).toBe(dataArray.length);
  // });

  // it("メニュークリックでページ遷移", () => {
  //   const menu = document.querySelector(
  //     `a[href="${dataArray[0].url}"]`
  //   ) as HTMLElement;
  //   // console.log(menu);
  //   user.click(menu);
  //   expect(menu).toHaveAttribute("href", "/admin/handle-question");
  // });
});
