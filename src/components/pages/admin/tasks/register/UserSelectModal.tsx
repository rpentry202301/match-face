'use client'
import { ReactNode, useState } from "react"
import { createPortal } from "react-dom"

// ラップしたコンポーネントをModal化するコンポーネントを仮作成
const Modal = ({
  children,
  buttonText,
  canCloseByClickingBackground = true
}: {
  children: ReactNode,
  buttonText: string,
  canCloseByClickingBackground?: boolean,
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)

  if (!isOpen) {
    return (
      <button type="button" onClick={open}>{buttonText}</button>
    )
  }

  const elmModal = (
    <div className="fixed top-0 left-0 z-20 flex items-center justify-center w-full h-full">
      <div className="relative z-10 box-border w-4/5 max-w-3xl p-10 overflow-y-auto bg-white border-r-4">
        <button
          type="button"
          aria-label="モーダルを閉じる"
          className="absolute top-1 right-3 p-0 text-4xl font-bold border-none cursor-pointer text-gray-300 bg-transparent"
          onClick={close}
        >
          x
        </button>
        {children}
      </div>
      {canCloseByClickingBackground && <div
        className="absolute top-0 left-0 w-full h-full bg-black opacity-30"
        onClick={close}
      />}
    </div>
  )
  return createPortal(elmModal, document.body)
}

const UserSelectModal = () => {
  return <Modal buttonText="追加">
    test
  </Modal>
}

export default UserSelectModal
