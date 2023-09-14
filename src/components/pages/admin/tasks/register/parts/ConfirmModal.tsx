"use client";

import GrayButton from "@/components/ui/button/GrayButton";
import { createPortal } from "react-dom";

const ConfirmModal = ({ children, isOpened, submit, close }: ModalProps) => {
  if (!isOpened) return <>{children}</>;

  return (
    <>
      <>{children}</>
      <PortalConfirmModal submit={submit} close={close} />
    </>
  );
};
type ModalProps = {
  children: React.ReactNode;
  isOpened: boolean;
  submit: () => void;
  close: () => void;
};

/**
 * @author Hayato Kobayashi
 * @description 送信確認モーダル用React Portal
 */
const PortalConfirmModal = ({ submit, close }: PortalProps) => {
  const portal = (
    <div className="fixed top-0 left-0 w-full h-screen">
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="bg-white px-10 py-10 z-20">
          <h2 className="font-black mb-10 text-xl" data-testid="confirmRemark">
            タスクを確定してよろしいですか?
          </h2>
          <div className="flex flex-col items-center justify-center mx-5 my-1">
            <GrayButton
              label="確定する"
              className="rounded-none"
              onClick={() => {
                submit();
                close();
              }}
            />
            <p
              className="cursor-pointer hover:underline mt-4"
              onClick={() => close()}
            >
              キャンセル
            </p>
          </div>
        </div>
      </div>
      <div
        className="absolute top-0 left-0 w-full h-full bg-black opacity-30"
        onClick={() => close()}
      />
    </div>
  );
  return createPortal(portal, document.body);
};
type PortalProps = {
  submit: () => void;
  close: () => void;
};

export default ConfirmModal;
