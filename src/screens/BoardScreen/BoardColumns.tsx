import { Card, CreateCard } from "@components"
import { iFirebaseUser } from "@providers"
import { iBoard, iCard } from "@types"
import * as React from "react"
import { useState } from "react"
import { BoardDomain } from "./handlers"

enum Columns {
  WENT_WELL = "went-well",
  NEUTRAL = "neutral",
  DID_NOT_GO_WELL = "did-not-go-well",
}

export const BoardColumns = ({
  board,
  cards,
  boardDomain,
  user,
}: {
  board: iBoard
  cards: iCard[]
  boardDomain: BoardDomain
  user: iFirebaseUser
}) => {
  const [selectedCardId, setSelectedCardId] = useState<string>()

  let sortedCards = cards
  if (board.stage === "improve") {
    sortedCards = [...sortedCards].sort((a, b) => b.votes - a.votes)
  }

  const createCard = async (column: Columns) => {
    const cardId = await boardDomain.createCard({ column, user })
    setSelectedCardId(cardId)
  }

  const updateCard = async ({ card, data }: { card: iCard; data: object }) => {
    await boardDomain.updateCard(card, data)
    setSelectedCardId(null)
  }

  const deleteCard = async ({ card }: { card: iCard }) => {
    await boardDomain.deleteCard(card)
    setSelectedCardId(null)
  }

  const onSelectCard = (card: iCard) => {
    if (board.stage === "write") setSelectedCardId(card.id)
  }

  const onReveal = (card: iCard) => {
    if (board.stage === "explain")
      boardDomain.updateCard(card, { isRevealed: !card.isRevealed })
  }

  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-3 gap-7"
      onClick={() => {
        setSelectedCardId(null)
      }}
    >
      <div>
        <p className={"text-sm sm:text-md font-mono p-2 rounded text-center"}>
          Went well
        </p>
        {sortedCards
          ?.filter((card) => {
            return card.column === Columns.WENT_WELL
          })
          .map((card) => (
            <Card
              key={card.id}
              card={card}
              onSave={(data) => updateCard({ card, data })}
              onDelete={() => deleteCard({ card })}
              onSelect={(_card) => onSelectCard(_card)}
              onReveal={onReveal}
              focussed={card.id === selectedCardId}
              board={board}
              user={user}
            />
          ))}
        {board?.stage === "write" && (
          <CreateCard onClick={() => createCard(Columns.WENT_WELL)} />
        )}
      </div>
      <div>
        <p className={"text-sm sm:text-md font-mono p-2 rounded text-center"}>
          Neutral
        </p>
        {sortedCards
          ?.filter((card) => {
            return card.column === Columns.NEUTRAL
          })
          .map((card) => (
            <Card
              key={card.id}
              card={card}
              onSave={(data) => updateCard({ card, data })}
              onDelete={() => deleteCard({ card })}
              onSelect={(_card) => onSelectCard(_card)}
              onReveal={onReveal}
              focussed={card.id === selectedCardId}
              board={board}
              user={user}
            />
          ))}
        {board?.stage === "write" && (
          <CreateCard onClick={() => createCard(Columns.NEUTRAL)} />
        )}
      </div>
      <div>
        <p className={"text-sm sm:text-md font-mono p-2 rounded text-center"}>
          Could have gone better
        </p>
        {sortedCards
          ?.filter((card) => {
            return card.column === Columns.DID_NOT_GO_WELL
          })
          .map((card) => (
            <Card
              key={card.id}
              card={card}
              onSave={(data) => updateCard({ card, data })}
              onDelete={() => deleteCard({ card })}
              onSelect={(_card) => onSelectCard(_card)}
              onReveal={onReveal}
              focussed={card.id === selectedCardId}
              board={board}
              user={user}
            />
          ))}
        {board?.stage === "write" && (
          <CreateCard onClick={() => createCard(Columns.DID_NOT_GO_WELL)} />
        )}
      </div>
    </div>
  )
}
