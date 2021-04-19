import React, { useEffect, useMemo, useState } from "react"
import { RadioSlide } from "@components"
import { iBoard, iCard } from "@types"
import { useAuth, useFirebase, useUser } from "@providers"
import { useRouter } from "next/router"
import Link from "next/link"
import { BoardDomain } from "./handlers"
import { getRandomQuote } from "@lib"
import { BoardColumns } from "./BoardColumns"

const BOARD_STAGES = ["prepare", "write", "explain", "vote", "improve"]

export default function Board() {
  const router = useRouter()
  const boardId: string = router.query.id as string
  const firebase = useFirebase()
  const [board, setBoard] = useState<iBoard>()
  const [cards, setCards] = useState<iCard[]>([])
  const { user, loading } = useUser()
  const auth = useAuth()

  const boardDomain = useMemo(
    () => boardId && new BoardDomain({ firebase, boardId }),
    [boardId]
  )

  useEffect(() => {
    if (boardDomain) {
      const boardSubscription = boardDomain.subscribeToBoard(setBoard)
      const cardSubscription = boardDomain.subscribeToCards(setCards)
      return () => {
        boardSubscription()
        cardSubscription()
      }
    }
  }, [boardDomain])

  useEffect(() => {
    if (!loading && !user) {
      auth.signInAnonymously()
    }
  }, [loading])

  const quote = boardId && getRandomQuote(boardId)

  return (
    <div className="container mx-auto">
      <p>
        <Link href={`/boards`}>
          <a>Back to boards</a>
        </Link>
      </p>
      <div className="text-4xl">{board?.title}</div>

      <RadioSlide
        options={BOARD_STAGES}
        currentValue={board?.stage}
        onChangeCallback={(newValue) =>
          boardDomain.updateBoard(board, { stage: newValue })
        }
      />

      {/* <p>user id: {user?.uid}</p> */}
      <div className="my-5">
        {board && board?.stage === "prepare" && (
          <div className={"p-20 rounded bg-gray-100"}>
            <p
              className={
                "text-3xl mx-10 my-20 flex font-serif italic leading-relaxed text-gray-500 whitespace-pre-line"
              }
            >
              {quote.quote}
            </p>
            <p className={"text-xl font-bold text-right"}>{quote.source}</p>
          </div>
        )}

        {board && board?.stage !== "prepare" && (
          <BoardColumns
            board={board}
            cards={cards}
            user={user}
            boardDomain={boardDomain}
          />
        )}
      </div>
    </div>
  )
}
