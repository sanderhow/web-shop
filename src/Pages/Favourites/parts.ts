import styled from "@emotion/styled";
import { mobileBreakpoint, tabletBreakpoint } from "../../utils/utils";

export const FavouritesWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: fit-content;
  margin: 50px 25px 20px;
  gap: 20px;
  @media screen and (min-width: ${mobileBreakpoint}) and (max-width: ${tabletBreakpoint}) {
    width: 100%;
    display: flex;
  }
`;
