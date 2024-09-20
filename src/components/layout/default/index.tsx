import styled from "styled-components";
import { Outlet } from "react-router-dom";
import DefaultHeader from "@/components/header/default";
import DefaultFooter from "@/components/footer/default";

const DefaultLayout = () => {
  return (
    <DefaultLayoutContainer>
      <DefaultHeader />
      <Body>
        <Outlet />
      </Body>
      <DefaultFooter />
    </DefaultLayoutContainer>
  );
};

export default DefaultLayout;

const DefaultLayoutContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`;

const Body = styled.div`
  height: 100%;
  min-height: calc(100vh - 100px);
  padding-top: 70px;
`;
