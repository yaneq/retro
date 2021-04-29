import { iCard } from "@types"
import styled from "styled-components"

export const CardContainer = styled.div<{
  card: iCard
  editMode: boolean
  allowVote: boolean
  allowEdit: boolean
  allowReveal: boolean
  isBlurred: boolean
  isDimmed: boolean
}>`
  margin: 1rem 0;
  display: block;
  padding: 1.2rem 1.7rem;
  color: #444;
  font-size: 11pt;
  text-decoration: none;
  border: 1px solid #eaeaea;
  border-radius: 10px;
  ${({ editMode, allowVote, allowEdit, allowReveal }) =>
    (allowReveal || allowEdit) && !editMode && !allowVote
      ? "cursor: pointer"
      : "cursor: default"};
  background-color: ${({ card }) =>
    card?.column === "went-well"
      ? "#add"
      : card?.column === "neutral"
      ? "#e5e5e5"
      : "#dad"};
  position: relative;

  user-select: none;
  opacity: ${({ isDimmed }) => (isDimmed ? "0.3" : "1")};
  ${({ isBlurred }) => (isBlurred ? "color: transparent;" : "")}
  ${({ isBlurred }) =>
    isBlurred
      ? "text-shadow: 0 0 8px rgba(0, 0, 0, 0.6);'"
      : "text-shadow: 0 0 8px rgba(0, 0, 0, 0.0);"}
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

export const VoteContainer = styled.div<{ allowVote: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  bottom: 10px;
  right: 10px;
  position: absolute;
  cursor: ${({ allowVote }) => (allowVote ? "pointer" : "default")};
  user-select: none;
  transition: font 0.2s ease;
  background-color: rgba(250, 250, 250, 0.9);
  padding: 2px 8px;
  border-radius: 15px;
  width: 50px;
  height: 30px;
`

export const VoteCount = styled.span`
  font-weight: bold;
  margin: 0 auto;
`
