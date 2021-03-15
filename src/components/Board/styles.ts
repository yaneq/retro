import styled from "styled-components"

export const BoardContainer = styled.div`
  margin: 1rem 0;
  display: block;
  padding: 1.2rem;

  color: inherit;
  text-decoration: none;
  border: 2px solid #eee;
  border-radius: 10px;
  transition: color 0.25s ease, border-color 0.15s ease;
  cursor: pointer;
  font-size: 20pt;
  font-weight: bold;

  &:hover {
    color: #266;
    border-color: #add;
    background-color: #eff;
  }
`
