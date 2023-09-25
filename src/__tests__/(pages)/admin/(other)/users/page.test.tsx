import { entryDataMock, departmentMock, statusMock } from "./UserListPageMock";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import UsersPage from "@/app/(pages)/admin/(other)/users/page";
import userEvent from "@testing-library/user-event";
import React from "react";
import "@testing-library/jest-dom";
import SearchUser from "@/components/pages/admin/users/SearchUser";
import UserList from "@/components/pages/admin/users/UserList";

const user = userEvent.setup();
describe("ユーザー管理画面のテスト", () => {
  global.fetch = jest.fn().mockImplementation((url, config) => {
    if (url === "/api/admin/users/department") {
      return Promise.resolve({
        json: () => Promise.resolve(departmentMock),
      });
    } else if (url === "/api/admin/users/status") {
      return Promise.resolve({
        json: () => Promise.resolve(statusMock),
      });
    } else if (url === "/api/admin/users/userList") {
      return Promise.resolve({
        json: () => Promise.resolve(entryDataMock),
      });
    }
  });

  beforeEach(async () => await waitFor(() => render(<UsersPage />)));
  it("スナップショット", async () => {
    await waitFor(() => {
      const { container } = render(<UsersPage />);
      expect(container).toMatchSnapshot();
    });
  });

  // SearchUserコンポーネントのテスト
  it("departmentが表示されている", async () => {
    await waitFor(() => {
      const department = screen.getByTestId("department_1");
      expect(department).toHaveTextContent("Java");
    });
  });

  it("取得したstatusが表示されている", async () => {
    await waitFor(() => {
      const status = screen.getByTestId("status_1");
      expect(status).toHaveTextContent("研修中");
    });
  });

  it("input欄が表示されている", async () => {
    await waitFor(() => {
      const input = screen.getByTestId("input");
      expect(input).toBeInTheDocument();
    });
  });
  it("検索ボタンが表示されている", async () => {
    await waitFor(() => {
      const serachButton = screen.getByTestId("searchButton");
      expect(serachButton).toBeInTheDocument();
    });
  });

  it("年月の値を変更する", async () => {
    await waitFor(() => {
      const year = screen.getByTestId<HTMLSelectElement>("year");
      const month = screen.getByTestId<HTMLSelectElement>("month");
      fireEvent.change(year, { target: { value: 2020 } });
      expect(year.value).toBe("2020");
      fireEvent.change(month, { target: { value: 10 } });
      expect(month.value).toBe("10");
    });
  });

  it("職種ボタンをクリックするとbg-grayが適用される", async () => {
    await waitFor(() => {
      const departmentButton = screen.getByTestId("department_1");
      expect(departmentButton).toBeInTheDocument();
      user.click(departmentButton);
      expect(departmentButton).toHaveClass("active:bg-gray-200");
    });
  });

  it("statusボタンをクリックするとbg-grayが適用される", async () => {
    await waitFor(() => {
      const statusButton = screen.getByTestId("status_1");
      expect(statusButton).toBeInTheDocument();
      user.click(statusButton);
      expect(statusButton).toHaveClass("active:bg-gray-200");
    });
  });

  // UserListコンポーネントのテスト
  it("初期値に「入社日昇順」が設定されていることを確認", async () => {
    await waitFor(() => {
      const selectedOption = screen.getByTestId("selectedOption");
      expect(selectedOption).toHaveValue("入社日昇順");
    });
  });

  it("ユーザーデータの初期表示（昇順）", async () => {
    await waitFor(() => {
      const hireDate = screen.getAllByTestId("hireDate");
      expect(hireDate).toHaveLength(6);
      const firstHireDate = hireDate[0].textContent;
      expect(firstHireDate).toBe("2023-01-01");
      const lastHireDate = hireDate[5].textContent;
      expect(lastHireDate).toBe("2023-04-01");
      screen.debug();
    });
  });

  it("ユーザーデータを降順に並べ替える", async () => {
    await waitFor(() => {
      const selectElement =
        screen.getByTestId<HTMLSelectElement>("selectedOption");
      fireEvent.change(selectElement, { target: { value: "入社日降順" } });
      expect(selectElement.value).toBe("入社日降順");
      const hireDate = screen.getAllByTestId("hireDate");
      const firstHireDate = hireDate[0].textContent;
      expect(firstHireDate).toBe("2023-04-01");
      const lastHireDate = hireDate[5].textContent;
      expect(lastHireDate).toBe("2023-01-01");
    });
  });
});
