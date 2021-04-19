export interface iBoard {
  id: string
  title: string
  stage: "prepare" | "write" | "explain" | "vote" | "improve"
}

export interface iCard {
  id: string
  text: string
  column: "went-well" | "neutral" | "did-not-go-well"
  createdBy: string
  votes: number
  isRevealed: boolean
}
