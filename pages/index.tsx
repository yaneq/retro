import { Col, Container, Row } from "react-bootstrap"
import React, { useEffect, useState } from "react"
import { Board, CreateBoard } from "@components"
import { useFirebase } from "@providers"
import { iBoard } from "@types"
import * as FirebaseStatic from "firebase"
import Link from "next/link"

export default function Boards() {
  const firebase = useFirebase()
  const [boards, setBoards] = useState<iBoard[]>([])
  useEffect(() => {
    const subscription = firebase.firestore
      .collection("boards")
      .onSnapshot((snapshot) => {
        let _boards: iBoard[] = []
        snapshot.forEach((documentSnapshot: any) => {
          _boards.push({ ...documentSnapshot.data(), id: documentSnapshot.id })
        })
        setBoards(_boards)
      })
    return () => {
      subscription()
    }
  }, [])

  const createBoard = ({ title }: { title?: string }) => {
    firebase.firestore.collection("boards").add({
      title,
      createdAt: FirebaseStatic.default.firestore.FieldValue.serverTimestamp(),
    })
  }

  const updateBoard = ({ board, title }: { board: iBoard; title: string }) => {
    firebase.firestore
      .collection("boards")
      .doc(board.id)
      .set({ title }, { merge: true })
  }

  const deleteBoard = ({ board }: { board: iBoard }) => {
    firebase.firestore.collection("boards").doc(board.id).delete()
  }

  return (
    <Container>
      <h1>Retro Boards</h1>
      <Row>
        <Col>
          {boards.map((board) => (
            <Link href={`/boards/${board.id}`} key={board.id}>
              <a>
                <Board board={board} />
              </a>
            </Link>
          ))}
          <CreateBoard onClick={() => createBoard({ title: "title" })} />
        </Col>
      </Row>
    </Container>
  )
}