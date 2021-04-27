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
            className="text-gray-800 text-2xl sm:text-3xl font-sans font-semibold"
            onClick={() => {
              setIsEditMode(true)
              setTimeout(() => inputRef.current.focus(), 100)
            }}
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
            className="text-gray-800 text-3xl bg-yellow-100 font-sans font-semibold border-1 w-full"
            onKeyDown={(event) => {
              event.key === "Enter" && saveAndClose()
            }}
          />
        )}
        <p className="mt-2 text-gray-400 font-sans">
          {board.createdAt?.toDate().toLocaleDateString()}
        </p>
      </div>
      <div className="flex justify-end mt-4">
        <Link href={`/boards/${board.id}`} key={board.id}>
          <a
            href="/boards/"
            className="items-center px-10 py-2 mt-10 font-semibold text-white transition duration-200 ease-in-out transform rounded-lg hover:bg-primary-btn-hover focus:outline-none bg-primary-btn cursor-pointer"
          >
            Open
          </a>
        </Link>
      </div>
      <div className="absolute bottom-7 left-7">
        <a
          onClick={() => deleteBoard({ board })}
          className={
            "text-gray-300 hover:text-primary-btn cursor-pointer transition-colors duration-200"
          }
          title="Delete board"
        >
          <FaTrash />
        </a>
      </div>
    </div>
  )
})
