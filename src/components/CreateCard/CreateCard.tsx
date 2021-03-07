import React from "react"

import { CardContainer } from "./styles"

export const CreateCard = ({ onClick }: { onClick(): void }) => {
  return <CardContainer onClick={() => onClick()}>➕ add</CardContainer>
}
