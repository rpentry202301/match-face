import Header from "@/components/elements/header/Header";
import { cleanup, render } from "@testing-library/react";
import UserIcon from "@/components/elements/header/nav/UserIcon";

// ServerComponentがJestでエラーを吐くので、UserIcon.tsxをモック
jest.mock("@/components/elements/header/nav/UserIcon", () => {
  const mockUserIcon = () => {
    return <div>ユーザーアイコン</div>;
  };
  return mockUserIcon;
});

describe("Header.tsx", () => {
  beforeAll(async () => {
    jest.clearAllMocks();
    cleanup();
  });
  afterAll(() => {
    jest.clearAllMocks();
    cleanup();
  });
  it("スナップショットテスト", () => {
    const { container } = render(<Header />);
    expect(container).toMatchSnapshot();
  });
});
