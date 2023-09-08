import { render, screen, cleanup, act, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { mockHistoriesData, skillData } from "./mock";
import HistoriesPage from "@/app/(pages)/(general)/(other)/histories/page";
import HistoryList from "@/components/pages/general/histories/HistoryList";
import userEvent from "@testing-library/user-event";
import OrangeButton from "@/components/ui/button/OrangeButton";

// スナップショットテスト
describe("スナップショットテスト", () => {
  global.fetch = jest.fn().mockImplementation((url, config) => {
    if (url === "http://localhost:3000/api/histories/skills") {
      return {
        ok: true,
        json: async () => skillData,
      };
    }
    if (url === "http://localhost:3000/api/histories") {
      return {
        ok: true,
        json: async () => mockHistoriesData,
      };
    }
  });
  it("スナップショット", async () => {
    const { container } = render(<HistoriesPage />);
    await waitFor(() => {
      expect(container).toMatchSnapshot();
    });
  });
});

// 機能・インタラクションテスト
describe("一般ユーザー質問一覧画面", () => {
  global.fetch = jest.fn().mockImplementation((url, config) => {
    if (url === "http://localhost:3000/api/histories/skills") {
      return {
        ok: true,
        json: async () => skillData,
      };
    }
    if (url === "http://localhost:3000/api/histories") {
      return {
        ok: true,
        json: async () => mockHistoriesData,
      };
    }
  });
  beforeEach(async () => {
    await waitFor(() => {
      render(<HistoriesPage />);
    });
  });
  describe("Histories Page", () => {
    it("絞り込み<button>が存在する", async () => {
      await waitFor(() => {
        const element = screen.getAllByRole("button", { name: "絞り込み" });
        expect(element).toBeTruthy();
      });
    });

    it("絞り込み<button>をクリックすると、関数が呼び出される", async () => {
      const mockFn = jest.fn();
      await waitFor(async () => {
        // await render(<OrangeButton label="絞り込み" onClick={mockFn} />);
        const element = screen.getByTestId("submitButton");
        // expect(element).toBeTruthy();
        await userEvent.click(element);
        // expect(mockFn).toHaveBeenCalled();
        // await render(<HistoryList click={true} month={"2023-09-01"} />);
        screen.debug();
      });
    });
    it("JavaScriptが選択されていない", async () => {
      let selectedSkill: HTMLElement;
      await waitFor(() => {
        selectedSkill = screen.getByRole("checkbox", { name: "JavaScript" });
        expect(selectedSkill).not.toBeChecked();
      });
    });
    it("JavaScriptが選択されていない", async () => {
      let selectedSkill: HTMLElement;
      await waitFor(async () => {
        selectedSkill = screen.getByRole("checkbox", { name: "JavaScript" });
        await userEvent.click(selectedSkill);
        expect(selectedSkill).toBeChecked();
      });
    });
    it("Javascriptチェックし絞り込みクリックすると、HistoryListに何も表示されない", async () => {});
  });
  //   describe("ボタン", () => {
  //     it("回答済みであれば、ボタンの色が緑である&&「確認する」", async () => {
  //       let element;
  //       await waitFor(() => {
  //         element = screen.getByTestId(
  //           `confirmButton${mockData.answerRequestList[0].id}`
  //         );
  //       });
  //       console.log(element);
  //       expect(element).toHaveClass("bg-green");
  //       expect(element).toHaveTextContent("確認する");
  //     });
  //     it("確認するボタンにresult/[id]へのLinkがある", async () => {
  //       let element;
  //       await waitFor(() => {
  //         element = screen.getByTestId(
  //           `linkButton${mockData.answerRequestList[0].id}`
  //         );
  //       });
  //       screen.debug();
  //       expect(element).toHaveAttribute(
  //         "href",
  //         `result/${mockData.answerRequestList[0].id}`
  //       );
  //     });
  //   });
});
