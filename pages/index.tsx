import { Col, Container, Row } from "react-bootstrap"
import React, { useEffect, useState } from "react"
import { Card, CreateCard } from "@components"
import { iCard } from "src/components/types"
import { useFirebase } from "@providers"

enum Columns {
  WENT_WELL = "went-well",
  NEUTRAL = "neutral",
  DID_NOT_GO_WELL = "did-not-go-well",
}

export default function Home() {
  const firebase = useFirebase()
  const [cards, setCards] = useState<iCard[]>([])
  useEffect(() => {
    const subscription = firebase.firestore
      .collection("boards")
      .doc("t13hq18CxZo2YnlR784N")
      .collection("cards")
      .onSnapshot((snapshot) => {
        console.log("on snapshot")
        let cards: iCard[] = []
        snapshot.forEach((documentSnapshot: any) => {
          cards.push({ ...documentSnapshot.data(), id: documentSnapshot.id })
        })
        console.log("got cards", cards)
        setCards(cards)
      })
    return () => {
      subscription()
    }
  }, [])

  const updateCard = ({ card, text }: { card: iCard; text: string }) => {
    firebase.firestore
      .collection("boards")
      .doc("t13hq18CxZo2YnlR784N")
      .collection("cards")
      .doc(card.id)
      .set({ text }, { merge: true })
  }

  const createCard = ({ column }: { column: string }) => {
    firebase.firestore
      .collection("boards")
      .doc("t13hq18CxZo2YnlR784N")
      .collection("cards")
      .add({ column })
  }

  const deleteCard = ({ card }: { card: iCard }) => {
    firebase.firestore
      .collection("boards")
      .doc("t13hq18CxZo2YnlR784N")
      .collection("cards")
      .doc(card.id)
      .delete()
  }

  return (
    <Container>
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
                card={card}
                onSave={(text) => updateCard({ card, text })}
                onDelete={() => deleteCard({ card })}
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

// export default function Home() {
//   return (
//     <div className={styles.container}>
//       <Head>
//         <title>Create Next App</title>
//         <link rel="icon" href="/favicon.ico" />
//       </Head>

//       <main className={styles.main}>
//         <h1 className={styles.title}>Exciting Retro</h1>

//         <p className={styles.description}>A retro that just works</p>

//         <div className={styles.grid}>
//           <div className={styles.column}>
//             <h3>Went well</h3>
//           </div>
//           <div className={styles.column}>
//             <h3>Neutral</h3>
//           </div>
//           <div className={styles.column}>
//             <h3>To improve</h3>
//           </div>

//           <a href="https://nextjs.org/docs" className={styles.card}>
//             <p>Find in-depth information about Next.js features and API.</p>
//           </a>

//           <a href="https://nextjs.org/learn" className={styles.card}>
//             <p>Learn about Next.js in an interactive course with quizzes!</p>
//           </a>

//           <a
//             href="https://github.com/vercel/next.js/tree/master/examples"
//             className={styles.card}
//           >
//             <h3>Examples &rarr;</h3>
//             <p>Discover and deploy boilerplate example Next.js projects.</p>
//           </a>

//           <a
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
//             className={styles.card}
//           >
//             <h3>Deploy &rarr;</h3>
//             <p>
//               Instantly deploy your Next.js site to a public URL with Vercel.
//             </p>
//           </a>
//         </div>
//       </main>

//       <footer className={styles.footer}>
//         <a
//           href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Powered by{" "}
//           <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
//         </a>
//       </footer>
//     </div>
//   )
// }
