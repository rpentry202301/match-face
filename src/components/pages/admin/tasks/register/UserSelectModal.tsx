'use client'
import { useState, ReactNode, ChangeEvent, FormEvent } from "react"
import { createPortal } from "react-dom"
import WhiteButton from "@/components/ui/button/WhiteButton"
import WhiteButtonCheckBox from "@/components/pages/admin/tasks/register/parts/WhiteButtonCheckBox"
import OrangeButton from "@/components/ui/button/OrangeButton"
import SelectBox from "@/components/ui/selectbox/SelectBox"
import { group as groupConst } from "@/const/group"
import { departments } from "@/const/tasks"
import UserList from "./parts/UserList"

const state = ['研修中', '待機中', 'アサイン中']
const groupValues = groupConst.map((group) => group.group_name)

// 実際にレンダリングされるモーダルは以下に記述
const UserSelectModal = () => {
  const [ isOpened, setIsOpened ] = useState(false)

  // 状態初期化用にオブジェクトを作成
  const initDepartments = departments.map((dep) => {
    return {
      label: dep.name,
      checked: false,
    }
  })
  const initState = state.map((state) => {
    return {
      label: state,
      checked: false,
    }
  })

  const [ formData, setFormData ] = useState({
    search: "",
    year: "",
    month: "",
    department: initDepartments,
    state: initState,
    group: "",
  })
  
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

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // チェックボックスは型が異なるため別の関数で
  const handleChangeCheckBox = (e: ChangeEvent<HTMLInputElement>, name: "department" | "state") => {
    const newData = formData[name];
    newData.map((data) => {
      if(data.label === e.target.value) {
        data.checked = !data.checked
      }
      return newData
    })
    setFormData({ ...formData, [name]: newData})
  }

  // Todo: APIができたら実装
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(formData)
  }

  return (
    <Modal buttonText="追加" isOpened={isOpened} open={open} close={close}>
      <div>
        <h2 className="text-base ml-3">▶️ユーザーを選択する</h2>
      </div>
      <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col justify-center items-center border-2 w-10/12 px-10 py-5 mt-3 mx-auto">
        <div className="flex flex-col gap-5 w-fit mx-auto">
          <div className="flex items-center">
            <input
              id="search"
              name="search"
              type="text"
              value={formData.search}
              onChange={handleChange}
              className="border-light-gray border-2 text-xs p-1 w-10/12"
              data-testid="search-box"
            />
            <WhiteButton label="検索" className="text-xs ml-4 w-16" />
          </div>
          <div className="flex items-center gap-1">
            <SelectBox
              optionVal={yearArr}
              value={formData.year}
              name="year"
              onChange={handleChange}
              className="text-xs p-1"
              id="year"
              data-testid="select-year"
            />
            <span className="text-xs">年</span>
            <SelectBox
              optionVal={monthArr}
              value={formData.month}
              name="month"
              onChange={handleChange}
              className="text-xs p-1"
              id="month"
              data-testid="select-month"
            />
            <span className="text-xs">月入社</span>
          </div>
          <div className="flex gap-4 flex-wrap">
            {departments.map((element) => (
              <WhiteButtonCheckBox
                key={`dep_${element.id}`}
                id={`dep_${element.id}`}
                label={element.name}
                value={element.name}
                name="department"
                className="text-xs px-1 w-16"
                onChange={(e) => handleChangeCheckBox(e, "department")}
              />
            ))}
          </div>
          <div className="flex gap-4">
            {state.map((element) => {
              return (
                element.length < 4
                ? <WhiteButtonCheckBox
                  key={element}
                  id={element}
                  label={element}
                  value={element}
                  name="state"
                  className="text-xs w-16 px-1 whitespace-nowrap"
                  onChange={(e) => handleChangeCheckBox(e, "state")}
                />
                : <WhiteButtonCheckBox
                  key={element}
                  id={element}
                  label={element}
                  value={element}
                  name="state"
                  className="text-xs px-1 w-24"
                  onChange={(e) => handleChangeCheckBox(e, "state")}
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
                value={formData.group}
                name="group"
                onChange={handleChange}
                className="w-10/12 text-xs p-1"
                id="group"
                data-testid="select-group"
              />
            </div>
          </div>
        </div>
        <div className="mx-auto mt-7">
          <OrangeButton type="submit" label="絞り込み" className="text-xs" />
        </div>
      </form>

      <UserList />

      <div className="mx-auto mt-8 w-fit">
        <OrangeButton label="選択完了" className="text-xs" onClick={close}/>
      </div>
    </Modal>
  )
}

// Modalは親コンポーネント内ではなく外で定義
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
