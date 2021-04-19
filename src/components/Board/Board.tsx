import React, { forwardRef, useState } from "react"
import { iBoard } from "@types"
import { BoardContainer } from "./styles"

export const Board = forwardRef(({ board }: { board: iBoard }, ref) => (
  // <BoardContainer ref={ref}>{board.title}</BoardContainer>
  <div className="max-w-md py-4 px-8 shadow-lg rounded-lg border-2 border-grey-100 bg-gradient-to-r from-white to-gray-50">
    <div>
      <h2 className="text-gray-800 text-3xl font-semibold">{board.title}</h2>
      <p className="mt-2 text-gray-600">Created at some date</p>
    </div>
    <div className="flex justify-end mt-4">
      <a
        href="#"
        className="bg-black text-white font-bold py-2 px-10 rounded-lg text-grey-800"
      >
        Open
      </a>
    </div>
  </div>
))
