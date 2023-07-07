import { ReactNode, useState } from "react"
import { createPortal } from "react-dom"
import WhiteButton from "@/components/ui/button/WhiteButton"

const useModal = () => {
  const [isOpened, setIsOpened] = useState(false)
  
  const open = () => setIsOpened(true)
  const close = () => setIsOpened(false)

  // ネストしたコンポーネントをモーダル化するコンポーネント
  // canCloseByClickingBackgroundはモーダル外をクリックした際に閉じるかどうかのBoolean
  const Modal = ({
    children,
    buttonText,
    canCloseByClickingBackground = true
  }: {
    children: ReactNode,
    buttonText: string,
    canCloseByClickingBackground?: boolean,
  }) => {
    if (!isOpened) {
      return (
        <WhiteButton label={buttonText} onClick={open} className="text-xs" />
      )
    }
  
    // レンダリングするDOMをbodyに固定するためPortalを使用
    const elmModal = (
      <div className="fixed top-0 left-0 z-20 flex items-center justify-center w-full h-full">
        <div className="relative z-10 px-10 py-6 w-4/5 max-w-3xl overflow-y-auto bg-white translate-y-3">
          {children}
        </div>
        {canCloseByClickingBackground
          ? <div
            className="absolute top-0 left-0 w-full h-full bg-black opacity-30"
            onClick={close}
          />
          : <div
            className="absolute top-0 left-0 w-full h-full bg-black opacity-30"
          />
        }
      </div>
    )
    return createPortal(elmModal, document.body)
  }

  return { Modal, open, close }
}

export default useModal
