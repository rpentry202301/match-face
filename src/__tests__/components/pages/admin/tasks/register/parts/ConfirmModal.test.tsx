import ConfirmModal from "@/components/pages/admin/tasks/register/parts/ConfirmModal";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";
import "@testing-library/jest-dom";

// スタブ
const ConfirmModalStub = ({ ...props }: React.ComponentProps<"button">) => {
  return <button {...props}>開く</button>;
};

// ドライバ
const ConfirmModalDriver = () => {
  const [isOpened, setIsOpened] = useState(false);
  return (
    <ConfirmModal
      isOpened={isOpened}
      close={() => setIsOpened(false)}
      submit={() => setIsOpened(false)}
    >
      <ConfirmModalStub onClick={() => setIsOpened(true)} />
    </ConfirmModal>
  );
};

describe("ComfirmModal.tsx", () => {
  // スナップショットテストはできない(スタブが表示されるため)
  beforeAll(() => {
    cleanup();
  });
  afterAll(() => {
    cleanup();
  });

  it("モーダル開く→キャンセル", () => {
    render(<ConfirmModalDriver />);
    fireEvent.click(screen.getByText("開く"));
    const Modal = screen.getByTestId("confirm-modal");
    expect(Modal).toBeInTheDocument();
    fireEvent.click(screen.getByText("キャンセル"));
    expect(Modal).not.toBeInTheDocument();
  });
  it("モーダル開く→モーダル外クリック", () => {
    render(<ConfirmModalDriver />);
    fireEvent.click(screen.getByText("開く"));
    const Modal = screen.getByTestId("confirm-modal");
    expect(Modal).toBeInTheDocument();
    fireEvent.click(screen.getByTestId("modal-bg"));
    expect(Modal).not.toBeInTheDocument();
  });
  it("モーダル開く→キャンセル", () => {
    render(<ConfirmModalDriver />);
    fireEvent.click(screen.getByText("開く"));
    const Modal = screen.getByTestId("confirm-modal");
    expect(Modal).toBeInTheDocument();
    fireEvent.click(screen.getByText("確定する"));
    expect(Modal).not.toBeInTheDocument();
  });
});
