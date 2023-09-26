import { render, screen, cleanup, act, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { mockHistoriesData, skillData } from "./mock";
import HistoriesPage from "@/app/(pages)/(general)/(other)/histories/page";
import HistoryList from "@/components/pages/general/histories/HistoryList";
import userEvent from "@testing-library/user-event";

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
describe("一般ユーザー回答履歴一覧画面", () => {
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
    it("非同期処理の確認。fetchが2回呼び出されたこと確認", async () => {
      await waitFor(() => {
        expect(fetch).toBeCalledTimes(2);
      });
    });

    it("絞り込み<button>が存在する", async () => {
      await waitFor(() => {
        const element = screen.getAllByRole("button", { name: "絞り込み" });
        expect(element).toBeTruthy();
      });
    });

    it("何も選択せず絞り込みボタンをクリックすると、ユーザーの全件を表示する", async () => {
      await waitFor(async () => {
        const element = screen.getByTestId("submitButton");
        await userEvent.click(element);
        screen.debug();
        await waitFor(() =>
          expect(screen.getAllByText("バックエンド案件")).toHaveLength(3)
        );
      });
    });
    it("JavaScriptにチェックがついていないことを確認", async () => {
      let selectedSkill: HTMLElement;
      await waitFor(() => {
        selectedSkill = screen.getByRole("checkbox", { name: "JavaScript" });
        expect(selectedSkill).not.toBeChecked();
      });
    });
    it("JavaScriptにチェックがついていることを確認", async () => {
      let selectedSkill: HTMLElement;
      await waitFor(async () => {
        selectedSkill = screen.getByRole("checkbox", { name: "JavaScript" });
        await userEvent.click(selectedSkill);
        screen.debug();
        expect(selectedSkill).toBeChecked();
      });
    });

    it("2023-10-01が選択されることを確認", async () => {
      let selectMonth: HTMLOptionElement;
      await waitFor(() => {
        selectMonth = screen.getByTestId("Month") as HTMLOptionElement;
      });
      const beforeSelectMonth: HTMLOptionElement = screen.getByRole("option", {
        name: "--",
      });
      expect(beforeSelectMonth.selected).toBe(true);
      await userEvent.selectOptions(screen.getByTestId("Month"), "2023-10-01");
      const selectOct: HTMLOptionElement = screen.getByRole("option", {
        name: "2023-10-01",
      });
      expect(selectOct.selected).toBe(true);
      expect(beforeSelectMonth.selected).toBe(false);
    });
  });
});
