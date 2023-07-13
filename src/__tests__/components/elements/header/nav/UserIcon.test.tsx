import UserIcon from "@/components/elements/header/nav/UserIcon";
import { render } from "@testing-library/react";

// Todo: 非同期通信のモック
describe("UserIcon.tsx", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.clearAllMocks();
  });
  it("スナップショットテスト", async() => {
    // Note: 非同期通信を行うServerComponentのテストはこう書く
    const {container} = render(await UserIcon());
    expect(container).toMatchSnapshot();
  });
});
