import * as React from "react"
import { TopMenu } from "src/components/TopMenu"

const Landing = () => {
  return (
    <>
      <TopMenu />
      <div className="container w-full p-20 m-4 mx-auto my-16 text-center bg-white border-2 border-dashed border-blueGray-300 h-96 rounded-xl">
        <p className="mt-20 italic tracking-tighter text-md text-blueGray-500 title-font">
          -- Content goes here --
        </p>
      </div>
    </>
  )
}

export default Landing
