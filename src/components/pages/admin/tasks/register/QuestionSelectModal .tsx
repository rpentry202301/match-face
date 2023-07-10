'use client'
import { useState, ReactNode } from "react"
import { createPortal } from "react-dom"
import WhiteButton from "@/components/ui/button/WhiteButton"
import WhiteCheckButton from "@/components/ui/button/WhiteCheckButton"
import Input from "@/components/ui/Input"
import OrangeButton from "@/components/ui/button/OrangeButton"
import { skills } from "@/const/admin_histories"
import { departments } from "@/const/tasks"
import CheckBox from "@/components/ui/checkbox/CheckBox"
import QuestionList from "./QuestionList"

// 実際にレンダリングされるモーダルは以下に記述
const QuestionSelectModal = () => {
  const [ search, setSearch ] = useState('')
  const [ year, setYear ] = useState('')
  const [ month, setMonth ] = useState('')
  const [ group, setGroup ] = useState('')
  const [ isOpened, setIsOpened ] = useState(false)
  
  const open = () => setIsOpened(true)
  const close = () => setIsOpened(false)

  // 2000年からの配列を作成
  const maxYear = (new Date()).getFullYear()
  const yearArr = Array(maxYear-1999)
    .fill(2000)
    .map((num, index) => `${num + index}`)
  yearArr.unshift("")
  
  // 月の配列を作成
  const monthArr = Array(12)
    .fill(1)
    .map((num, index) => `${num + index}`)
  monthArr.unshift("")

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
      <div className="fixed top-0 left-0 z-30 flex items-center justify-center w-full h-full">
        <div className="relative z-20 px-6 py-6 w-11/12 max-w-4xl bg-white">
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

  return (
    <Modal buttonText="追加">
      <div className="flex flex-col item-center border-2 rounded-md w-5/6 mx-auto mt-2 p-8">
        <div className="flex items-center mb-4 mx-auto">
          <Input
            id="search"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border-light-gray text-xs p-1 w-96"
          />
          <WhiteButton label="検索" className="text-xs ml-4 w-16" />
        </div>
        <div className="flex items-center mb-6 mx-auto pl-4">
          {departments.map((element) => (
            <WhiteCheckButton
              key={`teck_${element.id}`}
              label={element.name}
              className="text-xs w-16 mx-2"
            />
          ))}
        </div>
        <div className="flex mx-auto">
          <span className="text-xs">使用技術：</span>
          <div className="grid grid-cols-6 gap-3 pl-2">
            {skills.map((skill) => (
              <div key={`skill_${skill.id}`} className="flex">
                <CheckBox id={`skill_${skill.id}`} />
                <label htmlFor={`skill_${skill.id}`} className="text-xs ml-1">{skill.skill}</label>
              </div>
            ))}
          </div>
        </div>
      </div>

      <QuestionList />

      <div className="mx-auto mt-8 w-fit">
        <OrangeButton label="選択完了" className="w-28 h-8 text-sm" onClick={close}/>
      </div>
    </Modal>
  )
}

export default QuestionSelectModal
