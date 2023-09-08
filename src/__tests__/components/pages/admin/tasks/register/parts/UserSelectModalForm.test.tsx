import UserSelectModalForm from "@/components/pages/admin/tasks/register/parts/UserSelectModalForm";
import { UserSelectProvider } from "@/hooks/store/context/UserSelectContext";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// コンポーネント内では初期表示用のfetchは無いので、ダミーデータを渡しています
export const userSelectModalFetchedData = {
  departments: [
    {
      id: 1,
      name: 'Java',
    },
    {
      id: 2,
      name: 'PHP',
    },
    {
      id: 3,
      name: 'FR',
    },
    {
      id: 4,
      name: 'CL',
    },
    {
      id: 5,
      name: 'ML',
    },
    {
      id: 6,
      name: 'QA',
    }
  ],
  statuses: [
    {
      id: 1,
      name: '研修中',
    },
    {
      id: 2,
      name: '待機中',
    },
    {
      id: 3,
      name: 'アサイン中',
    }
  ],
  userGroups: [
    {
      id: 1,
      name: 'グループ1',
    },
    {
      id: 2,
      name: 'グループ2',
    }
  ],
  users: [
    {
      id: 3,
      name: 'テスト珠子',
      hireDate: '2023-04-01',
      departmentId: 3,
      department: {
        id: 3,
        name: 'FR'
      },
      statusId: 3,
      status: {
        id: 3,
        name: 'アサイン中'
      },
    },
    {
      id: 4,
      name: 'テスト洋子',
      hireDate: '2023-04-01',
      departmentId: 4,
      department: {
        id: 4,
        name: 'CL'
      },
      statusId: 1,
      status: {
        id: 1,
        name: '研修中'
      },
    },
    {
      id: 1,
      name: 'テスト太郎',
      hireDate: '2023-01-01',
      departmentId: 1,
      department: {
        id: 1,
        name: 'Java'
      },
      statusId: 2,
      status: {
        id: 2,
        name: '待機中'
      },
    },
    {
      id: 2,
      name: 'テスト次郎',
      hireDate: '2023-01-01',
      departmentId: 2,
      department: {
        id: 2,
        name: 'PHP'
      },
      statusId: 1,
      status: {
        id: 1,
        name: '研修中'
      },
    }
  ]
}

// モーダル展開用関数
const open = () => {
  render(
    <UserSelectProvider>
      <UserSelectModalForm fetchData={userSelectModalFetchedData} />
    </UserSelectProvider>
  );
  fireEvent.click(screen.getByRole("button"));
}

describe("UserSelectModalForm.tsx", () => {
  beforeEach(() => {
    // モーダルを開く
    open();
  })

  describe("スナップショットテスト", () => {
    it("モーダルを開いている状態", () => {
      const { baseElement, rerender } = render(
        <UserSelectProvider>
          <UserSelectModalForm fetchData={userSelectModalFetchedData} />
        </UserSelectProvider>
      );
      rerender(
        <UserSelectProvider>
          <UserSelectModalForm fetchData={userSelectModalFetchedData} />
        </UserSelectProvider>
      );
      expect(baseElement).toMatchSnapshot();
    });
  })

  describe("入力テスト", () => {
    const user = userEvent.setup()
    it("検索ボックスの入力テスト", async () => {
      render(
        <UserSelectProvider>
          <UserSelectModalForm fetchData={userSelectModalFetchedData} />
        </UserSelectProvider>
      );
      const input = screen.getByTestId("search-box") as HTMLInputElement;
      fireEvent.change(input, { target: { value: "田中太郎" } });
      expect(input.value).toBe("田中太郎");
    });
  
    it("入社年の選択テスト", async () => {
      render(
        <UserSelectProvider>
          <UserSelectModalForm fetchData={userSelectModalFetchedData} />
        </UserSelectProvider>
      );
      // デフォルト選択が空文字かどうか
      const beforeSelect = screen.getByTestId("year:") as HTMLOptionElement;
      expect(beforeSelect.selected).toBe(true);
      // 今年の入社年を選択してテスト
      const thisYear = new Date().getFullYear();
      await user.selectOptions(screen.getByTestId("select-year"), `${thisYear}`);
      const afterSelect = screen.getByTestId(`year:${thisYear}`) as HTMLOptionElement;
      expect(afterSelect.selected).toBe(true);
    });

    it("入社月の選択テスト", async () => {
      render(
        <UserSelectProvider>
          <UserSelectModalForm fetchData={userSelectModalFetchedData} />
        </UserSelectProvider>
      );
      const beforeSelect = screen.getByTestId("month:") as HTMLOptionElement;
      expect(beforeSelect.selected).toBe(true);
      // 1月を選択してテスト
      await user.selectOptions(screen.getByTestId("select-month"), "1")
      const afterSelect = screen.getByTestId("month:1") as HTMLOptionElement;
      expect(afterSelect.selected).toBe(true);
    })

    it("部署のチェックボックステスト", async () => {
      render(
        <UserSelectProvider>
          <UserSelectModalForm fetchData={userSelectModalFetchedData} />
        </UserSelectProvider>
      );
      const beforeCheck = screen.getByTestId("check-box:FR") as HTMLInputElement;
      expect(beforeCheck.checked).toBe(false);
      // Javaを選択してテスト
      await user.click(screen.getByTestId("check-box:FR"))
      const afterCheck = screen.getByTestId("check-box:FR") as HTMLInputElement;
      expect(afterCheck.checked).toBe(true);
    })

    it("ステータスのチェックボックステスト", async () => {
      render(
        <UserSelectProvider>
          <UserSelectModalForm fetchData={userSelectModalFetchedData} />
        </UserSelectProvider>
      );
      const beforeCheck = screen.getByTestId("check-box:待機中") as HTMLInputElement;
      expect(beforeCheck.checked).toBe(false);
      // 研修中を選択してテスト
      await user.click(screen.getByTestId("check-box:待機中"))
      const afterCheck = screen.getByTestId("check-box:待機中") as HTMLInputElement;
      expect(afterCheck.checked).toBe(true);
    })

    it("ユーザーグループの選択テスト", async () => {
      render(
        <UserSelectProvider>
          <UserSelectModalForm fetchData={userSelectModalFetchedData} />
        </UserSelectProvider>
      );
      const nowGroup = "";
      const beforeSelect = screen.getByTestId(`group:${nowGroup}`) as HTMLOptionElement;

      expect(beforeSelect.selected).toBe(true);
      // 別のグループを選択
      const newGroup = userSelectModalFetchedData.userGroups[1].name;
      await user.selectOptions(screen.getByTestId("select-group"), newGroup);
      const afterSelect = screen.getByTestId(`group:${newGroup}`) as HTMLOptionElement;
      expect(afterSelect.selected).toBe(true);
    })
  });
});
