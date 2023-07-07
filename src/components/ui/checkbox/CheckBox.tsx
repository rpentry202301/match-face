'use client'
import { ComponentProps } from "react"

const CheckBox = ({ ...props }: ComponentProps<"input">) => {
  return (
    <input type="checkbox" {...props} className="w-4 h-4 accent-orange" />
  )
}

export default CheckBox
