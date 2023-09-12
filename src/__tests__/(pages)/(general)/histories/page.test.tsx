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
        expect(selectedSkill).toBeChecked();
      });
    });
  });
});
