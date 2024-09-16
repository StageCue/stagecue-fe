import styled from "styled-components";
import Footer from "@components/footer";
import { Outlet } from "react-router-dom";
import DefaultHeader from "@/components/header/default";

const DefaultLayout = () => {
  return (
    <DefaultLayoutContainer>
      <DefaultHeader />
      <Body>
        <Outlet />
      </Body>
      <Footer />
    </DefaultLayoutContainer>
  );
};

export default DefaultLayout;

const DefaultLayoutContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
`;

const Body = styled.div`
  height: 100%;
  min-height: calc(100vh - 100px);
  padding-top: 70px;
`;
