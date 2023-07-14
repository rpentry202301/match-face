import UserIcon from "@/components/elements/header/nav/UserIcon";
import { cleanup, render } from "@testing-library/react";

// Todo: 非同期通信のモック
describe("UserIcon.tsx", () => {
  beforeAll(() => {
    jest.clearAllMocks();
    cleanup();
  });
  afterAll(() => {
    jest.clearAllMocks();
    cleanup();
  });
  it("スナップショットテスト", async() => {
    // Note: 非同期通信を行うServerComponentのテストはこう書く
    const {container} = render(await UserIcon());
    expect(container).toMatchSnapshot();
  });
});
