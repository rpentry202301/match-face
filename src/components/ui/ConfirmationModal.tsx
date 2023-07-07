"use client";

import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

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
        "flex justify-center items-center fixed top-0 left-0 w-full h-full bg-black/[.5] z-10",
      contents: "text-center w-1/3 pt-10 bg-white",
      wrap: "flex flex-col items-center mt-10 mb-5 gap-y-3",
      actionButton: "bg-deep-gray mx-2 px-12 py-2 w-fit",
      cancelButton: "text-black hover:text-opacity-50 py-2",
    };
    const margeOverlay = twMerge(style.overlay, props.className);
    const margeContents = twMerge(style.contents, props.className);
    const margeWrap = twMerge(style.wrap, props.className);
    const margeActionButton = twMerge(style.actionButton, props.className);
    const margeCancelButton = twMerge(style.cancelButton, props.className);

    return (
      <div onClick={toggleModal} className={margeOverlay}>
        <div onClick={(e) => e.stopPropagation()} className={margeContents}>
          {message}
          <div className={margeWrap}>
            <button {...props} className={margeActionButton}>
              {firstLabel}
            </button>
            <button className={margeCancelButton} onClick={toggleModal}>
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
