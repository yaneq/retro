import React, { forwardRef, useState } from "react"
import { iBoard } from "@types"
import { BoardContainer } from "./styles"

export const Board = forwardRef(({ board }: { board: iBoard }, ref) => (
  <BoardContainer ref={ref}>{board.title}</BoardContainer>
))
