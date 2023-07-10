'use client'
import { ComponentProps } from "react"
import { twMerge } from "tailwind-merge"

const CheckBox = ({ ...props }: ComponentProps<"input">) => {
  const style = twMerge(
    "w-4 h-4 accent-orange",
    props.className
  )
  return (
    <input type="checkbox" {...props} className={style} />
  )
}

export default CheckBox
