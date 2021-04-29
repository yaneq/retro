import React, { useEffect, useState } from "react"
import { Board } from "@components"
import { FirebaseServerTimestamp, useFirebase, useUser } from "@providers"
import { iBoard } from "@types"
import { TopMenu } from "@components"
import { PlusIcon } from "@heroicons/react/solid"
import { getNextRetroTitle } from "@lib"

export default function Boards() {
  const firebase = useFirebase()
  const [boards, setBoards] = useState<iBoard[]>([])
  const { user } = useUser()

  useEffect(() => {
    if (user) {
      const subscription = firebase.firestore
        .collection("boards")
        .orderBy("createdAt", "desc")
        .where("createdBy", "==", user?.uid)
        .onSnapshot((snapshot) => {
          let _boards: iBoard[] = []
          snapshot.forEach((documentSnapshot: any) => {
            _boards.push({
              ...documentSnapshot.data(),
              id: documentSnapshot.id,
            })
          })
          setBoards(_boards)
        })
      return () => {
        subscription()
      }
    }
  }, [user])

  const createBoard = () => {
    if (!user) throw new Error("You need to authenticate first")
    const previousTitle = boards.length > 0 ? boards[0].title : ""
    firebase.firestore.collection("boards").add({
      title: getNextRetroTitle({ previousTitle }),
      createdAt: FirebaseServerTimestamp,
      createdBy: user?.uid,
      stage: "prepare",
    })
  }

  return (
    <>
      <TopMenu />
      <div className="container">
        <div
          className={
            "w-full p-8 text-xl font-bold font-sans text-center border-2 border-gray-300 rounded-xl my-20 cursor-pointer flex justify-center items-center bg-green-300 hover:bg-green-400"
          }
          onClick={() => createBoard()}
        >
          <PlusIcon className="h-8 w-8 inline-block" /> Create a new board
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-7 mt-10">
          {boards.map((board) => (
            <Board key={board.id} board={board} />
          ))}
        </div>
      </div>
    </>
  )
}
