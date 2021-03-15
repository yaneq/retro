export interface iBoard {
  id: string
  title: string
}

export interface iCard {
  id: string
  text: string
  column: "went-well" | "neutral" | "did-not-go-well"
}
