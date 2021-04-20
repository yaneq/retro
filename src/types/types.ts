import { iFirebaseTimestamp } from "@providers"

export interface iBoard {
  id: string
  title: string
  stage: "prepare" | "write" | "explain" | "vote" | "improve"
  createdAt: iFirebaseTimestamp
  createdBy: string
}

export interface iCard {
  id: string
  text: string
  column: "went-well" | "neutral" | "did-not-go-well"
  createdBy: string
  votes: number
  isRevealed: boolean
}
