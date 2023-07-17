import styled from "@emotion/styled";
import { mobileBreakpoint, tabletBreakpoint } from "./utils/utils";

export const AppWrapper1 = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  margin: 10px 0px 0px 292px;
  z-index: 1;
  @media screen and (max-width: ${tabletBreakpoint}) {
    margin: 0;
  }
`;

export const AppWrapper2 = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`;

export const Header = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`;
