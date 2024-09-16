import styled from "styled-components";
import Footer from "@components/footer";
import { Outlet } from "react-router-dom";
import AuthHeader from "@/components/header/auth";

const AuthLayout = () => {
  return (
    <AuthLayoutContainer>
      <AuthHeader />
      <Body>
        <Outlet />
      </Body>
      <Footer />
    </AuthLayoutContainer>
  );
};

export default AuthLayout;

const AuthLayoutContainer = styled.div`
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
