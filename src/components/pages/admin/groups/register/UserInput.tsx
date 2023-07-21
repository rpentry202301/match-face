'use client'
import Input from "@/components/ui/Input"
import { useUserSelect } from "@/hooks/store/context/UserSelectContext"

const UserInput = () => {
  const [ userSelect ] = useUserSelect()
  const users = userSelect.reduce((cur, user) => cur + ", " + user, "").slice(2)
  return (
    <Input
      id="user"
      style={{ width: "600px" }}
      className="my-3 px-2 py-1 border-2 border-gray-300"
      value={users}
      readOnly
    />
  )
}

export default UserInput
