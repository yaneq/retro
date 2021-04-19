import {
  FirebaseServerTimestamp,
  iFirebaseContext,
  iFirebaseUser,
} from "@providers"
import { iBoard, iCard } from "@types"
import firebaseApp from "firebase/app"

export class BoardDomain {
  private _firebase
  private _boardId

  constructor({
    firebase,
    boardId,
  }: {
    firebase: iFirebaseContext
    boardId: string
  }) {
    this._firebase = firebase
    this._boardId = boardId
  }

  subscribeToBoard = (onUpdateCallback: { (iBoard): void }): Function => {
    return this._firebase.firestore
      .collection("boards")
      .doc(this._boardId)
      .onSnapshot(
        (snapshot: firebaseApp.firestore.DocumentSnapshot<iBoard>) => {
          onUpdateCallback(snapshot.data())
        }
      )
  }

  updateBoard(board: iBoard, data: object) {
    this._firebase.firestore
      .collection("boards")
      .doc(this._boardId)
      .set({ ...board, ...data }, { merge: true })
  }

  subscribeToCards = (onUpdateCallback: { (iCard): void }): Function => {
    return this._firebase.firestore
      .collection("boards")
      .doc(this._boardId)
      .collection("cards")
      .orderBy("createdAt")
      .onSnapshot((snapshot) => {
        let cards: iCard[] = []
        snapshot.forEach((documentSnapshot: any) => {
          cards.push({ ...documentSnapshot.data(), id: documentSnapshot.id })
        })
        onUpdateCallback(cards)
      })
  }

  async createCard({ column, user }: { column: string; user: iFirebaseUser }) {
    return new Promise<string>(async (resolve, reject) => {
      const doc = await this._firebase.firestore
        .collection("boards")
        .doc(this._boardId)
        .collection("cards")
        .add({
          column,
          votes: 0,
          createdAt: FirebaseServerTimestamp,
          createdBy: user.uid,
          isRevealed: false,
        })
      const docData = await doc.get()
      resolve(docData.id)
    })
  }

  async updateCard(card: iCard, data: object) {
    console.log("the card is", card.id)
    return new Promise<iCard>(async (resolve, reject) => {
      const doc = await this._firebase.firestore
        .collection("boards")
        .doc(this._boardId)
        .collection("cards")
        .doc(card.id)
      await doc.set({ ...card, ...data }, { merge: true })
      console.log("doc pre get", doc)
      const docData = await doc.get()
      resolve(docData)
    })
  }

  async deleteCard(card: iCard): Promise<iCard> {
    return new Promise<iCard>(async (resolve, reject) => {
      await this._firebase.firestore
        .collection("boards")
        .doc(this._boardId)
        .collection("cards")
        .doc(card.id)
        .delete()
      resolve(card)
    })
  }
}
