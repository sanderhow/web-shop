import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { mobileBreakpoint, tabletBreakpoint } from "../../utils/utils";

export const BasketWrapper = styled.div<{ hasProducts: boolean }>`
  flex-wrap: wrap;
  width: fit-content;
  margin-left: 10px;
  width: 95%;
  gap: 20px;
  height: 100%;
  justify-content: center;

  @media screen and (min-width: ${mobileBreakpoint}) and (max-width: ${tabletBreakpoint}) {
    width: 100%;
    margin: auto;
    display: flex;
  }

  ${({ hasProducts }) =>
    !hasProducts &&
    css`
      margin-left: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      width: 100%;
    `}
`;

export const BasketWrapperMobile = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  gap: 20px;
  @media screen and (min-width: ${mobileBreakpoint}) and (max-width: ${tabletBreakpoint}) {
    width: 45%;
  }
`;

export const ButtonWrapper = styled.div`
  margin-left: auto;
  margin-top: 20px;
  float: right;

  @media (max-width: ${tabletBreakpoint}) {
    width: 200px;
    height: 30px;
    margin: 0;
    display: flex;
    float: none;
    justify-content: center;
  }
`;

export const ProductPhoto = styled.img`
  object-fit: contain !important;
  background-color: white;
  padding: 20px 0 !important;
`;

export const DontHaveProducts = styled.div`
  display: flex;
  flex-direction: column;
`;
