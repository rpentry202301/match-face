import UserList from "@/components/pages/admin/tasks/register/parts/UserList";
import { render } from "@testing-library/react";

// Todo: 非同期通信実装後は情報取得後の挙動について自動テストを実装する

describe("UserList.tsx", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("UserListのスナップショット", () => {
    const { container } = render(<UserList />);
    expect(container).toMatchSnapshot();
  });
})
