import { iCard } from "@types"
import styled from "styled-components"

export const CardContainer = styled.div<{
  card: iCard
  editMode: boolean
  allowVote: boolean
  allowEdit: boolean
  allowReveal: boolean
  blurred: boolean
}>`
  margin: 1rem 0;
  display: block;
  padding: 1.7rem;
  color: #333;
  font-size: 11pt;
  text-decoration: none;
  border: 1px solid #eaeaea;
  border-radius: 10px;
  transition: color 0.5s ease, border-color 0.15s ease, text-shadow 0.5s ease;
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
  justify-content: center;
  align-items: center;
  bottom: 14px;
  right: 14px;
  position: absolute;
  line-height: 20px;
  cursor: ${({ allowVote }) => (allowVote ? "pointer" : "default")};
  user-select: none;
  /* transition: font 0.2s ease;
  font-size: ${({ allowVote }) => (allowVote ? "10pt" : "34pt")}; */
`

export const VoteCount = styled.span`
  font-weight: bold;
  padding-left: 4px;
`
