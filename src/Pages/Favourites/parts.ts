import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { mobileBreakpoint, tabletBreakpoint } from "../../utils/utils";

export const FavouritesWrapper = styled.div<{ hasProducts: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  width: fit-content;
  height: 100%;
  gap: 20px;
  margin: auto;

  @media screen and (min-width: ${mobileBreakpoint}) and (max-width: ${tabletBreakpoint}) {
    width: 100%;
    display: flex;
  }

  ${({ hasProducts }) =>
    hasProducts &&
    css`
      margin: auto;
    `}
`;

export const DontHaveProducts = styled.div`
  display: flex;
  flex-direction: column;
`;
