import React, { useEffect, useRef, useState } from "react"
import { Button } from "react-bootstrap"
import { iCard } from "@types"
import {
  ButtonContainer,
  CardContainer,
  CardInput,
  VoteContainer,
  VoteCount,
} from "./styles"
import { HandThumbsUp } from "react-bootstrap-icons"

export const Card = ({
  card,
  onSave,
  onDelete,
  focussed,
  onSelect,
  votingMode,
}: {
  card: iCard
  onSave(data: object): void
  onDelete(): void
  onSelect(card: iCard): void
  focussed: boolean
  votingMode: boolean
}) => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false)
  const [inputText, setInputText] = useState<string>(card.text || "")
  const inputRef = useRef(null)

  const saveAndClose = () => {
    onSave({ text: inputText })
    setIsEditMode(false)
  }

  useEffect(() => {
    setIsEditMode(focussed)
    if (focussed) {
      setTimeout(() => inputRef.current.focus(), 100)
    }
  }, [focussed])

  if (isEditMode) {
    return (
      <CardContainer
        card={card}
        editMode={true}
        onClick={(event) => event.stopPropagation()}
      >
        <CardInput
          ref={inputRef}
          type="text"
          value={inputText}
          onChange={(event) => setInputText(event.target.value)}
          onKeyDown={(event) => {
            event.key === "Enter" && saveAndClose()
          }}
        />
        <br />
        <ButtonContainer>
          <Button onClick={() => onDelete()} variant={"link"} size={"sm"}>
            Delete
          </Button>
          <Button
            onClick={() => {
              saveAndClose()
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
          event.stopPropagation()
          onSelect(card)
        }}
        card={card}
        votingMode={votingMode}
      >
        {card.text}
        {!!votingMode && (
          <VoteContainer
            onClick={(event) => {
              event.stopPropagation()
              onSave({ votes: card.votes + 1 })
            }}
          >
            <HandThumbsUp />
            <VoteCount>{card.votes}</VoteCount>
          </VoteContainer>
        )}
      </CardContainer>
    )
  }
}
