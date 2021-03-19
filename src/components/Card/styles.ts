import { iCard } from "@types"
import styled from "styled-components"

export const CardContainer = styled.div<{
  card: iCard
  editMode: boolean
  votingMode: boolean
}>`
  margin: 1rem 0;
  display: block;
  padding: 1.5rem;

  color: inherit;
  text-decoration: none;
  border: 1px solid #eaeaea;
  border-radius: 10px;
  transition: color 0.15s ease, border-color 0.15s ease;
  ${({ editMode, votingMode }) =>
    editMode || votingMode ? "" : "cursor: pointer"};
  background-color: ${({ card }) =>
    card?.column === "went-well"
      ? "#add"
      : card?.column === "neutral"
      ? "#e5e5e5"
      : "#dad"};
  position: relative;
`

export const CardInput = styled.input`
  font-size: 12pt;
  background-color: rgba(255, 255, 255, 0.7);
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #aaa;
  width: 100%;
  border-radius: 5px;
`

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
`

export const VoteContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 14px;
  right: 14px;
  position: absolute;
  line-height: 20px;
  cursor: pointer;
  user-select: none;
`

export const VoteCount = styled.span`
  font-weight: bold;
  padding-left: 4px;
`
