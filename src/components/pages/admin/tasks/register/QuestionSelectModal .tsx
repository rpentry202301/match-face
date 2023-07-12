'use client'
import { useState, ReactNode } from "react"
import { createPortal } from "react-dom"
import WhiteButton from "@/components/ui/button/WhiteButton"
import WhiteCheckButton from "@/components/ui/button/WhiteCheckButton"
import OrangeButton from "@/components/ui/button/OrangeButton"
import { skills } from "@/const/admin_histories"
import { departments } from "@/const/tasks"
import CheckBox from "@/components/ui/checkbox/CheckBox"
import QuestionList from "./parts/QuestionList"

// 実際にレンダリングされるモーダルは以下に記述
const QuestionSelectModal = () => {
  const [ search, setSearch ] = useState('')
  const [ isOpened, setIsOpened ] = useState(false)
  
  const open = () => setIsOpened(true)
  const close = () => setIsOpened(false)

  return (
    <Modal buttonText="追加" isOpened={isOpened} open={open} close={close}>
      <div className="flex flex-col items-center gap-8 w-full mx-auto">
        <div className="mx-auto">
          <div className="flex flex-col items-start gap-3">
            <div className="text-base">
              <h2>▶️質問を選択する</h2>
            </div>
            <div className="flex flex-col item-center justify-center px-12 py-5 border-2 w-full">
              <div className="flex flex-col items-center gap-5">
                <div className="flex flex-col items-center gap-5">
                  <div className="flex items-start justify-center gap-2 w-fit">
                    <input
                      id="search"
                      type="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="border-light-gray border-2 text-xs p-2 lg:w-96 sm:w-80 w-72"
                    />
                    <WhiteButton label="検索" className="text-xs ml-4 w-16" />
                  </div>
                  <div className="flex items-start gap-4 flex-wrap">
                    {departments.map((element) => (
                      <WhiteCheckButton
                        key={`teck_${element.id}`}
                        label={element.name}
                        className="text-xs w-16"
                      />
                    ))}
                  </div>
                  <div className="flex mx-auto gap-4">
                    <span className="text-xs">使用技術：</span>
                    <div className="grid xl:grid-cols-7 lg:grid-cols-6 md:grid-cols-4 grid-cols-3 gap-3">
                      {skills.map((skill) => (
                        <div key={`skill_${skill.id}`} className="flex">
                          <CheckBox id={`skill_${skill.id}`} />
                          <label htmlFor={`skill_${skill.id}`} className="text-xs ml-1">{skill.skill}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <OrangeButton label="絞り込み" className="text-xs" onClick={close}/>
              </div>
            </div>
          </div>
        </div>

        <QuestionList />

        <OrangeButton label="選択完了" className="text-xs" onClick={close}/>
      </div>
    </Modal>
  )
}

const Modal = ({
  children,
  buttonText,
  canCloseByClickingBackground = true,
  isOpened,
  open,
  close,
}: {
  children: ReactNode,
  buttonText: string,
  canCloseByClickingBackground?: boolean,
  isOpened: boolean,
  open: () => void,
  close: () => void,
}) => {
  if (!isOpened) {
    return (
      <WhiteButton label={buttonText} onClick={open} className="text-xs" />
    )
  }

  // レンダリングするDOMをbodyに固定するためPortalを使用
  const elmModal = (
    <div className="fixed top-0 left-0 z-30 flex items-center justify-center w-full h-full">
      <div className="relative z-20 w-3/4 max-w-5xl py-7 px-10 bg-white">
        {children}
      </div>
      {canCloseByClickingBackground
        ? <div className="absolute top-0 left-0 w-full h-full bg-black opacity-30" onClick={close} />
        : <div className="absolute top-0 left-0 w-full h-full bg-black opacity-30" />
      }
    </div>
  )
  return createPortal(elmModal, document.body)
}

export default QuestionSelectModal
