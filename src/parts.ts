import styled from "@emotion/styled";

export const AppWrapper1 = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 100vh;
    margin: 10px 100px;
    padding-left: 300px;
    @media (max-width: 800px) {
        margin: 10px 30px;
        padding-left: 10px;
    }
    z-index: 1;
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
