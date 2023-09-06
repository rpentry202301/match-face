'use client'
import { useState, ReactNode, ChangeEvent, FormEvent } from "react"
import { createPortal } from "react-dom"
import WhiteButton from "@/components/ui/button/WhiteButton"
import WhiteButtonCheckBox from "@/components/pages/admin/tasks/register/parts/WhiteButtonCheckBox"
import OrangeButton from "@/components/ui/button/OrangeButton"
import SelectBox from "@/components/ui/selectbox/SelectBox"
import UserList from "./parts/UserList"
import { useUserSelect } from "@/hooks/store/context/UserSelectContext"
import type { FetchUserModalData } from "@/types/admin/tasks/register/types"


// 実際にレンダリングされるモーダルは以下に記述
const UserSelectModal = ({ fetchData }: { fetchData: FetchUserModalData }) => {
  const [ isOpened, setIsOpened ] = useState(false)
  const [ users, setUsers ] = useState(fetchData.users)
  
  // 状態初期化用にオブジェクトを作成
  const initDepartments = fetchData.departments.map((dep) => {
    return {
      id: dep.id,
      label: dep.name,
      checked: false,
    }
  })
  const initState = fetchData.statuses.map((state) => {
    return {
      id: state.id,
      label: state.name,
      checked: false,
    }
  })

  const groupValues = fetchData.userGroups.map((group) => group.name)
  groupValues.unshift("")
  
  const [ formData, setFormData ] = useState({
    search: "",
    year: "",
    month: "",
    department: initDepartments,
    state: initState,
    group: "",
  })
  const [ userSelect, userSelectDispatch ] = useUserSelect()
  const [ checkedValues, setCheckedValue ] = useState<string[]>(userSelect)
  
  const open = () => {
    setCheckedValue(userSelect)
    setIsOpened(true)
  }
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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const name = formData.search
    const hireDate = (formData.year && formData.month)
      ? `${formData.year}-${Number(formData.month) < 10 ? `0${formData.month}` : `${formData.month}`}-01`
      : ""
    const checkedDepId = formData.department.filter((data) => data.checked).map((dep) => dep.id)
    const checkedStateId = formData.state.filter((data) => data.checked).map((state) => state.id)
    const selectedGroup = fetchData.userGroups.filter((group) => group.name === formData.group)

    const searchQuerys = [
      name ? `name=${name}` : "",
      hireDate ? `hireDate=${hireDate}` : "",
      checkedDepId.length ? `departmentId=${checkedDepId}` : "",
      checkedStateId.length ? `statusId=${checkedStateId}` : "",
      selectedGroup.length ? `groupId=${selectedGroup[0].id}` : "",
    ]

    const query = searchQuerys.filter((query) => query !== "").join("&")

    fetch(`http://localhost:3000/api/admin/tasks/register/modal?${query}`, {
      cache: 'no-cache',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        console.log(res.status)
        return res.json()
      })
      .then((data) => {
        setUsers(data.userList)
        console.log(users)
      })
      .catch((err) => console.log(err))
  }

  const handleChangeUserList = (e: ChangeEvent<HTMLInputElement>) => {
    if (checkedValues.includes(e.target.value)) {
      setCheckedValue(
        checkedValues.filter((value) => value !== e.target.value)
      )
    } else {
      setCheckedValue([...checkedValues, e.target.value])
    }
  }

  const handleClose = () => {
    userSelectDispatch({type: "select", payload: checkedValues})
    close()
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
            {fetchData.departments.map((element) => (
              <WhiteButtonCheckBox
                key={`dep_${element.id}`}
                id={`dep_${element.id}`}
                label={element.name}
                value={element.name}
                checked={formData.department.filter((data) => data.label === element.name)[0].checked}
                name="department"
                className="text-xs px-1 w-16"
                onChange={(e) => handleChangeCheckBox(e, "department")}
              />
            ))}
          </div>
          <div className="flex gap-4">
            {fetchData.statuses.map((element) => {
              return (
                element.name.length < 4
                ? <WhiteButtonCheckBox
                  key={`status_${element.id}`}
                  id={`status_${element.id}`}
                  label={element.name}
                  value={element.name}
                  checked={formData.state.filter((data) => data.label === element.name)[0].checked}
                  name="state"
                  className="text-xs w-16 px-1 whitespace-nowrap"
                  onChange={(e) => handleChangeCheckBox(e, "state")}
                />
                : <WhiteButtonCheckBox
                  key={`status_${element.id}`}
                  id={`status_${element.id}`}
                  label={element.name}
                  value={element.name}
                  checked={formData.state.filter((data) => data.label === element.name)[0].checked}
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

      <UserList users={users} checkedValues={checkedValues} onChange={handleChangeUserList} />

      <div className="mx-auto mt-8 w-fit">
        <OrangeButton label="選択完了" className="text-xs" onClick={handleClose}/>
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
