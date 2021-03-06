import React, { useEffect, useRef, useState } from "react"
import { iBoard, iCard } from "@types"
import {
  ButtonContainer,
  CardContainer,
  CardInput,
  VoteContainer,
  VoteCount,
} from "./styles"
import { ThumbUpIcon } from "@heroicons/react/outline"
import { iFirebaseUser } from "@providers"

export const Card = ({
  card,
  onSave,
  onDelete,
  focussed,
  onSelect,
  board,
  user,
  onReveal,
}: {
  card: iCard
  onSave(data: object): void
  onDelete(): void
  onSelect(card: iCard): void
  focussed: boolean
  board: iBoard
  user: iFirebaseUser
  onReveal(card: iCard): void
}) => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false)
  const [inputText, setInputText] = useState<string>(card.text || "")
  const inputRef = useRef(null)

  const allowEdit = board.stage === "write" && card.createdBy === user.uid
  const allowReveal = board.stage === "explain" && !card.isRevealed
  const allowVote = board.stage === "vote"
  const isDimmed = board.stage === "improve" && card?.votes === 0

  const isBlurred =
    board.stage !== "vote" &&
    ((board.stage === "write" && user?.uid !== card.createdBy) ||
      (board.stage === "explain" && !card.isRevealed) ||
      (board.stage === "improve" && card.votes === 0))

  const saveAndClose = () => {
    onSave({ text: inputText })
    setIsEditMode(false)
  }

  const reveal = () => {}

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
          <button onClick={() => onDelete()}>Delete</button>
          <button
            onClick={() => {
              saveAndClose()
            }}
          >
            Save
          </button>
        </ButtonContainer>
      </CardContainer>
    )
  } else {
    return (
      <CardContainer
        onClick={(event) => {
          event.stopPropagation()
          allowEdit && onSelect(card)
          board.stage === "explain" && onReveal(card)
        }}
        card={card}
        allowVote={allowVote}
        allowEdit={allowEdit}
        allowReveal={allowReveal}
        className={"font-sans"}
        isBlurred={isBlurred}
        isDimmed={isDimmed}
      >
        {card.text}
        {(!!allowVote || (board.stage === "improve" && card.votes > 0)) && (
          <VoteContainer
            allowVote={allowVote}
            onClick={(event) => {
              event.stopPropagation()
              allowVote && onSave({ votes: card.votes + 1 })
            }}
          >
            {allowVote && <ThumbUpIcon className={"w-4 h-4 mx-auto"} />}
            {card.votes > 0 && <VoteCount>{card.votes}</VoteCount>}
          </VoteContainer>
        )}
      </CardContainer>
    )
  }
}
