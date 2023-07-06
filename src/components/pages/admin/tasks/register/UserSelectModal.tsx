'use client'
import { ReactNode, useState } from "react"
import { createPortal } from "react-dom"
import WhiteButton from "@/components/ui/button/WhiteButton"
import WhiteCheckButton from "@/components/ui/button/WhiteCheckButton"

const teck = ['Java', 'PHP', 'FR', 'CL', 'ML', 'QA']
const state = ['研修中', '待機中', 'アサイン中']
const groupArr = ['', 'グループ1', 'グループ2', 'グループ3', 'グループ4', 'グループ5', 'グループ6', 'グループ7', 'グループ8']

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
  const [isOpened, setIsOpened] = useState(false)

  const open = () => setIsOpened(true)
  const close = () => setIsOpened(false)

  if (!isOpened) {
    return (
      <WhiteButton label={buttonText} onClick={open} />
    )
  }

  // レンダリングするDOMをbodyに固定するためPortalを使用
  const elmModal = (
    <div className="fixed top-0 left-0 z-20 flex items-center justify-center w-full h-full">
      <div className="relative z-10 p-10 w-4/5 max-w-3xl overflow-y-auto bg-white translate-y-3">
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

// 実際にレンダリングされるモーダルは以下に記述
const UserSelectModal = () => {
  const [ search, setSearch ] = useState('')
  const [ year, setYear ] = useState('')
  const [ month, setMonth ] = useState('')
  const [ group, setGroup ] = useState('')

  // 2000年からの配列を作成
  const maxYear = (new Date()).getFullYear()
  const yearArr = Array(maxYear-1999)
    .fill(2000)
    .map((num, index) => `${num + index}`)
  yearArr.unshift("----")
  
  // 月の配列を作成
  const monthArr = Array(12)
    .fill(1)
    .map((num, index) => `${num + index}`)
  monthArr.unshift("--")

  return (
    <Modal buttonText="追加">
      <div>
        <h2>▶️ユーザーを選択する</h2>
      </div>
      <div>
        <div className="flex">
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
          <WhiteButton label="検索" />
        </div>
        <div>
          <select
            name="year"
            id="year"
            onChange={(e) => setYear(e.target.value)}
            value={year}
          >
            {yearArr.map((year, index) => (
              <option key={`year_${index}`} value={year}>{year}</option>
            ))}
          </select>
          <span>年</span>
          <select
            name="month"
            id="month"
            onChange={(e) => setMonth(e.target.value)}
            value={month}
          >
            {monthArr.map((month, index) => (
              <option key={`month_${index}`} value={month}>{month}</option>
            ))}
          </select>
          <span>月入社</span>
        </div>
        <div>
          {teck.map((element) => <WhiteCheckButton key={element} label={element} />)}
        </div>
        <div>
          {state.map((element) => <WhiteCheckButton key={element} label={element} />)}
        </div>
        <div>
          <h2>▶️グループから検索する</h2>
        </div>
        <div>
          <select
            name="group"
            id="group"
            onChange={(e) => setGroup(e.target.value)}
            value={group}
          >
            {groupArr.map((element, index) => (
              <option key={`group_${index}`} value={element}>{element}</option>
            ))}
          </select>
        </div>
      </div>
    </Modal>
  )
}

export default UserSelectModal
