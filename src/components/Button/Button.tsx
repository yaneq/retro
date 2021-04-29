import { ReactNode } from "react"

export const Button = ({
  onClick,
  children,
}: {
  onClick: Function
  children: ReactNode
}) => {
  return (
    <div
      onClick={() => onClick()}
      className="items-center inline-block px-8 py-2 font-semibold text-white transition duration-500 ease-in-out transform rounded-lg hover:bg-green-500 focus:outline-none bg-green-400 cursor-pointer"
    >
      {children}
    </div>
  )
}
