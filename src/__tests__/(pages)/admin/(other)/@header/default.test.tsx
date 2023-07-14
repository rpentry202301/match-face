import { cleanup, render } from "@testing-library/react";
import UserIcon from "@/components/elements/header/nav/UserIcon";
import AdminHeaderPage from "@/app/(pages)/admin/(other)/@header/default";

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
    const { container } = render(<AdminHeaderPage />);
    expect(container).toMatchSnapshot();
  });
});
