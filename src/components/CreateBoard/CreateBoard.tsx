import React from "react"

import { BoardContainer } from "./styles"

export const CreateBoard = ({ onClick }: { onClick(): void }) => {
  return <BoardContainer onClick={() => onClick()}>➕ add</BoardContainer>
}
