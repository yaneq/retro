import React, { forwardRef, useRef, useState } from "react"
import { iBoard } from "@types"
import Link from "next/link"
import { useFirebase } from "@providers"
import { FaTrash } from "react-icons/fa"
import { NameInput } from "./styles"

export const Board = forwardRef(({ board }: { board: iBoard }, ref) => {
  const firebase = useFirebase()
  const [isEditMode, setIsEditMode] = useState(false)
  const [inputText, setInputText] = useState<string>(board.title || "")
  const inputRef = useRef(null)

  const updateBoard = ({ board, title }: { board: iBoard; title: string }) => {
    firebase.firestore
      .collection("boards")
      .doc(board.id)
      .set({ title }, { merge: true })
  }

  const saveAndClose = () => {
    updateBoard({ board, title: inputText })
    setIsEditMode(false)
  }

  const deleteBoard = ({ board }: { board: iBoard }) => {
    if (confirm("Delete?")) {
      firebase.firestore.collection("boards").doc(board.id).delete()
    }
  }

  return (
    <div className="max-w-md py-4 px-8 shadow-lg rounded-lg border-2 border-grey-100 bg-gradient-to-r from-white to-gray-50 relative">
      <div>
        {!isEditMode && (
          <h2
            className="text-gray-800 text-2xl sm:text-3xl font-semibold"
            onClick={() => setIsEditMode(true)}
          >
            {board.title}
          </h2>
        )}
        {isEditMode && (
          <NameInput
            ref={inputRef}
            type="text"
            value={inputText}
            onChange={(event) => setInputText(event.target.value)}
            onKeyDown={(event) => {
              event.key === "Enter" && saveAndClose()
            }}
          />
        )}
        <p className="mt-2 text-gray-600">
          {board.createdAt?.toDate().toLocaleDateString()}
        </p>
      </div>
      <div className="flex justify-end mt-4">
        <Link href={`/boards/${board.id}`} key={board.id}>
          <a
            href="/boards/"
            className="bg-black text-white font-bold py-2 px-10 rounded-lg text-grey-800"
          >
            Open
          </a>
        </Link>
      </div>
      <div className="absolute top-5 right-5">
        <a
          onClick={() => deleteBoard({ board })}
          className={
            "text-gray-400 hover:text-gray-600 cursor-pointer transition-colors duration-200"
          }
        >
          <FaTrash />
        </a>
      </div>
    </div>
  )
})
