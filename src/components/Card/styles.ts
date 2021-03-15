import { iCard } from "@types"
import styled from "styled-components"

export const CardContainer = styled.div<{ card: iCard }>`
  margin: 1rem 0;
  display: block;
  padding: 1.5rem;

  color: inherit;
  text-decoration: none;
  border: 1px solid #eaeaea;
  border-radius: 10px;
  transition: color 0.15s ease, border-color 0.15s ease;
  cursor: pointer;
  background-color: ${({ card }) =>
    card?.column === "went-well"
      ? "#add"
      : card?.column === "neutral"
      ? "#ddd"
      : "#dad"};
`
