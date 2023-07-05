"use client";

import { ComponentProps } from "react";

type Props = {
  isOpen: boolean;
  setIsOpen: Function;
  message: string;
  label: string;
} & ComponentProps<"button">;

const ConfirmationModal = ({
  isOpen,
  setIsOpen,
  message,
  label,
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
              {label}
            </button>
            <button className={style.cancelButton} onClick={toggleModal}>
              キャンセル
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

// ↓import先での使用例
// "use client";
// import { useState } from "react";
// import ConfirmationModal from "@/components/ui/ConfirmationModal";

// const Page = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   return (
//     <div>
//       <button onClick={() => setIsOpen(true)}>Click</button>
//       <ConfirmationModal
//         message="送信してよろしいですか？"
//         label="送信する"
//         isOpen={isOpen}
//         setIsOpen={setIsOpen}
//       />
//     </div>
//   );
// };

// export default Page;
