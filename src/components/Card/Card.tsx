import React, { useState } from "react"
import { Button } from "react-bootstrap"
import { iCard } from "@types"
import { CardContainer } from "./styles"

export const Card = ({
  card,
  onSave,
  onDelete,
}: {
  card: iCard
  onSave(value: string): void
  onDelete(): void
}) => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false)
  const [inputText, setInputText] = useState<string>(card.text || "")
  if (isEditMode) {
    return (
      <CardContainer card={card}>
        <input
          type="text"
          value={inputText}
          onChange={(event) => setInputText(event.target.value)}
        />
        <br />
        <Button onClick={() => onDelete()}>Delete</Button>
        <Button
          onClick={() => {
            onSave(inputText)
            setIsEditMode(false)
          }}
        >
          Save
        </Button>
      </CardContainer>
    )
  } else {
    return (
      <CardContainer onClick={() => setIsEditMode(true)} card={card}>
        {card.text}
      </CardContainer>
    )
  }
}
