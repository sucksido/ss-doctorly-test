import styled from "styled-components";

export const AutoCompleteContainer = styled.div`
  position: relative;
`;

export const AutoCompleteList = styled.div`
  position: absolute;
  height: 150px;
  overflow: auto;
  left: 0;
  right: 0;
  background-color: white;
`;

export const AutoCompleteListItem = styled.div`
  cursor: pointer;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: grey;
  }
`;
