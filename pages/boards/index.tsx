import React, { useEffect, useState } from "react"
import { Board, CreateBoard } from "@components"
import { FirebaseServerTimestamp, useFirebase, useUser } from "@providers"
import { iBoard } from "@types"
import { TopMenu } from "@components"

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

  const createBoard = ({ title }: { title?: string }) => {
    if (!user) throw new Error("You need to authenticate first")
    firebase.firestore.collection("boards").add({
      title,
      createdAt: FirebaseServerTimestamp,
      createdBy: user?.uid,
      stage: "prepare",
    })
  }

  return (
    <>
      <TopMenu />
      <div className="container grid grid-cols-1 sm:grid-cols-2 gap-7 mt-10">
        {boards.map((board) => (
          <Board key={board.id} board={board} />
        ))}
        <CreateBoard onClick={() => createBoard({ title: "title" })} />
      </div>
    </>
  )
}
