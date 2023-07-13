'use client'
import { useState, ReactNode } from "react"
import { createPortal } from "react-dom"
import WhiteButton from "@/components/ui/button/WhiteButton"
import WhiteCheckButton from "@/components/ui/button/WhiteCheckButton"
import OrangeButton from "@/components/ui/button/OrangeButton"
import SelectBox from "@/components/ui/selectbox/SelectBox"
import { group as groupConst } from "@/const/group"
import { departments } from "@/const/tasks"
import UserList from "./UserList"

const state = ['研修中', '待機中', 'アサイン中']
const groupValues = groupConst.map((group) => group.group_name)

// 実際にレンダリングされるモーダルは以下に記述
const UserSelectModal = () => {
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

  return (
    <Modal buttonText="追加" isOpened={isOpened} open={open} close={close}>
      <div>
        <h2 className="text-base ml-3">▶️ユーザーを選択する</h2>
      </div>
      <div className="flex flex-col justify-center items-center border-2 w-10/12 px-10 py-5 mt-3 mx-auto">
        <div className="flex flex-col gap-5 w-fit mx-auto">
          <div className="flex items-center">
            <input
              id="search"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border-light-gray border-2 text-xs p-1 w-10/12"
            />
            <WhiteButton label="検索" className="text-xs ml-4 w-16" />
          </div>
          <div className="flex items-center gap-1">
            <SelectBox
              optionVal={yearArr}
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="text-xs p-1"
            />
            <span className="text-xs">年</span>
            <SelectBox
              optionVal={monthArr}
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="text-xs p-1"
            />
            <span className="text-xs">月入社</span>
          </div>
          <div className="flex gap-4 flex-wrap">
            {departments.map((element) => (
              <WhiteCheckButton
                key={`teck_${element.id}`}
                label={element.name}
                className="text-xs w-16 "
              />
            ))}
          </div>
          <div className="flex gap-4">
            {state.map((element) => {
              return (
                element.length < 4
                ? <WhiteCheckButton
                  key={element}
                  label={element}
                  className="text-xs w-16 px-1 whitespace-nowrap"
                />
                : <WhiteCheckButton
                  key={element}
                  label={element}
                  className="text-xs px-1 w-24"
                />
              )
            })}
          </div>
          <div className="flex flex-col gap-2">
            <div>
              <h2>▶️グループから検索する</h2>
            </div>
            <div>
              <SelectBox
                optionVal={groupValues}
                value={group}
                onChange={(e) => setGroup(e.target.value)}
                className="w-10/12 text-xs p-1"
              />
            </div>
          </div>
        </div>
        <div className="mx-auto mt-7">
          <OrangeButton label="絞り込み" className="text-xs" />
        </div>
      </div>

      <UserList />

      <div className="mx-auto mt-8 w-fit">
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
      <div className="relative z-20 lg:w-3/4 md:w-4/5 w-11/12 p-5 max-w-3xl bg-white">
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

export default UserSelectModal
