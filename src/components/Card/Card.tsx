import React, { useEffect, useRef, useState } from "react"
import { Button } from "react-bootstrap"
import { iCard } from "@types"
import { ButtonContainer, CardContainer, CardInput } from "./styles"

export const Card = ({
  card,
  onSave,
  onDelete,
  focussed,
  onSelect,
}: {
  card: iCard
  onSave(value: string): void
  onDelete(): void
  onSelect(card: iCard): void
  focussed: boolean
}) => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false)
  const [inputText, setInputText] = useState<string>(card.text || "")
  const inputRef = useRef(null)
  useEffect(() => {
    setIsEditMode(focussed)
    if (focussed) {
      setTimeout(() => inputRef.current.focus(), 300)
    }
  }, [focussed])

  if (isEditMode) {
    return (
      <CardContainer card={card}>
        <CardInput
          ref={inputRef}
          type="text"
          value={inputText}
          onChange={(event) => setInputText(event.target.value)}
        />
        <br />
        <ButtonContainer>
          <Button onClick={() => onDelete()} variant={"link"} size={"sm"}>
            Delete
          </Button>
          <Button
            onClick={() => {
              onSave(inputText)
              setIsEditMode(false)
            }}
            variant={""}
          >
            Save
          </Button>
        </ButtonContainer>
      </CardContainer>
    )
  } else {
    return (
      <CardContainer
        onClick={(event) => {
          onSelect(card)
          event.stopPropagation()
        }}
        card={card}
      >
        {card.text}
      </CardContainer>
    )
  }
}
