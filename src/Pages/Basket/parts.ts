import styled from "@emotion/styled";

export const BasketWrapper = styled.div`
    display: contents;
    justify-content: center;
    flex-wrap: wrap;
    width: fit-content;
    margin: 50px 25px 20px;
    gap: 20px;
    @media (max-width: 800px) {
        width: 100%;
        margin: auto;
        display: flex;
    }
`;

export const BasketWrapperMobile = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    width: fit-content;
    margin: 50px 25px 20px;
    gap: 20px;
`;

export const ButtonWrapper = styled.div`
    margin-left: auto;
    margin-top: 20px;
    @media (max-width: 800px) {
        width: 200px;
        height: 30px;
        margin: auto;
        display: flex;
    }
`;

export const ProductPhoto = styled.img`
    object-fit: contain !important;
    background-color: white;
    padding: 20px 0 !important;
`;
