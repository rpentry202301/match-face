"use client";

import { ComponentProps } from "react";

type Props = {
  isOpen: boolean;
  setIsOpen: Function;
  message: string;
  firstLabel: string;
  secondLabel: string;
} & ComponentProps<"button">;

const ConfirmationModal = ({
  isOpen,
  setIsOpen,
  message,
  firstLabel,
  secondLabel,
  ...props
}: Props) => {
  const toggleModal = () => {
    setIsOpen(false);
  };
  if (isOpen) {
    const style = {
      overlay:
        "flex justify-center items-center fixed top-0 left-0 w-full h-full bg-black/[.5]",
      contents: "text-center w-1/2 p-4 bg-white",
      wrap: "flex flex-col items-center mt-4 gap-y-3",
      actionButton: "bg-deep-gray mx-2 px-12 py-1 w-fit",
      cancelButton: "text-black hover:text-opacity-50",
    };
    return (
      <div onClick={toggleModal} className={style.overlay}>
        <div onClick={(e) => e.stopPropagation()} className={style.contents}>
          {message}
          <div className={style.wrap}>
            <button {...props} className={style.actionButton}>
              {firstLabel}
            </button>
            <button className={style.cancelButton} onClick={toggleModal}>
              {secondLabel}
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default ConfirmationModal;
