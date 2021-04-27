import React, { useEffect, useMemo, useState } from "react"
import { RadioSlide, TopMenu } from "@components"
import { iBoard, iCard } from "@types"
import { useAuth, useFirebase, useUser } from "@providers"
import { useRouter } from "next/router"
import Link from "next/link"
import { BoardDomain } from "./handlers"
import { getRandomQuote } from "@lib"
import { BoardColumns } from "./BoardColumns"
import { FaChevronLeft } from "react-icons/fa"

const BOARD_STAGES = ["prepare", "write", "explain", "vote", "improve"]

export const BoardScreen = () => {
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
    <>
      <TopMenu />
      <div className="container mx-auto">
        <div className="text-3xl py-3  font-sans font-bold text-gray-700 h-16">
          {user && user?.uid === board?.createdBy && (
            <Link href={`/boards`}>
              <a className="pr-3 py-2">
                <FaChevronLeft size={15} style={{ display: "inline" }} />
              </a>
            </Link>
          )}
          <span className="font-serif">{board?.title}</span>
        </div>

        <div className="hidden sm:block">
          <RadioSlide
            options={BOARD_STAGES}
            currentValue={board?.stage}
            onChangeCallback={(newValue) =>
              boardDomain.updateBoard(board, { stage: newValue })
            }
          />
        </div>
        <div className="block sm:hidden text-lg font-sans p-4 bg-gray-100 rounded-xl text-center">
          <p className={"font-mono font text-xs"}>current step:</p>
          <p className="font-bold">{board?.stage}</p>
        </div>

        <div className="my-5">
          {board && board?.stage === "prepare" && (
            <div className={"sm:m-20 rounded-xl bg-gray-100 p-10"}>
              <p
                className={
                  "text-xl pb-4 flex font-serif italic leading-relaxed text-gray-500 whitespace-pre-line"
                }
              >
                {quote.quote}
              </p>
              <p className={"text-md font-bold text-right"}>{quote.source}</p>
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
    </>
  )
}
