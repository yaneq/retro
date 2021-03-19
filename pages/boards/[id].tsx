import { Col, Container, Row } from "react-bootstrap"
import React, { useEffect, useState } from "react"
import { Card, CreateCard } from "@components"
import { iCard } from "@types"
import { useFirebase } from "@providers"
import { useRouter } from "next/router"
import Link from "next/link"
import * as FirebaseStatic from "firebase"

enum Columns {
  WENT_WELL = "went-well",
  NEUTRAL = "neutral",
  DID_NOT_GO_WELL = "did-not-go-well",
}

export default function Board() {
  const router = useRouter()
  const boardId: string = router.query.id as string
  const firebase = useFirebase()
  const [cards, setCards] = useState<iCard[]>([])
  const [selectedCardId, setSelectedCardId] = useState<string>()

  useEffect(() => {
    const subscription = firebase.firestore
      .collection("boards")
      .doc(boardId)
      .collection("cards")
      .orderBy("createdAt")
      .onSnapshot((snapshot) => {
        let cards: iCard[] = []
        snapshot.forEach((documentSnapshot: any) => {
          cards.push({ ...documentSnapshot.data(), id: documentSnapshot.id })
        })
        setCards(cards)
      })
    return () => {
      subscription()
    }
  }, [boardId])

  const createCard = async ({ column }: { column: string }) => {
    const doc = await firebase.firestore
      .collection("boards")
      .doc(boardId)
      .collection("cards")
      .add({
        column,
        createdAt: FirebaseStatic.default.firestore.FieldValue.serverTimestamp(),
      })
    setSelectedCardId((await doc.get()).id)
  }

  const updateCard = ({ card, text }: { card: iCard; text: string }) => {
    firebase.firestore
      .collection("boards")
      .doc(boardId)
      .collection("cards")
      .doc(card.id)
      .set({ text }, { merge: true })
  }

  const deleteCard = ({ card }: { card: iCard }) => {
    firebase.firestore
      .collection("boards")
      .doc(boardId)
      .collection("cards")
      .doc(card.id)
      .delete()
  }

  return (
    <Container>
      <Row>
        <Link href={`/`}>Back to boards</Link>
      </Row>
      <h1>Retro Board</h1>
      <Row>
        <Col>
          <h3>Went well</h3>
          {cards
            .filter((card) => {
              return card.column === Columns.WENT_WELL
            })
            .map((card) => (
              <Card
                key={card.id}
                card={card}
                onSave={(text) => updateCard({ card, text })}
                onDelete={() => deleteCard({ card })}
                onSelect={(_card) => setSelectedCardId(_card.id)}
                focussed={card.id === selectedCardId}
              />
            ))}
          <CreateCard
            onClick={() => createCard({ column: Columns.WENT_WELL })}
          />
        </Col>
        <Col>
          <h3>Neutral</h3>
          {cards
            .filter((card) => {
              return card.column === Columns.NEUTRAL
            })
            .map((card) => (
              <Card
                card={card}
                onSave={(text) => updateCard({ card, text })}
                onDelete={() => deleteCard({ card })}
                onSelect={(_card) => setSelectedCardId(_card.id)}
                focussed={card.id === selectedCardId}
              />
            ))}
          <CreateCard onClick={() => createCard({ column: Columns.NEUTRAL })} />
        </Col>
        <Col>
          <h3>Could have gone better</h3>
          {cards
            .filter((card) => {
              return card.column === Columns.DID_NOT_GO_WELL
            })
            .map((card) => (
              <Card
                card={card}
                onSave={(text) => updateCard({ card, text })}
                onDelete={() => deleteCard({ card })}
                onSelect={(_card) => setSelectedCardId(_card.id)}
                focussed={card.id === selectedCardId}
              />
            ))}
          <CreateCard
            onClick={() => createCard({ column: Columns.DID_NOT_GO_WELL })}
          />
        </Col>
      </Row>
    </Container>
  )
}
