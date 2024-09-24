import DefaultFooter from "@/components/footer/default";
import BizHeader from "@/components/header/biz";
import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import styled from "styled-components";

const BizLayout = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <BizLayoutContainer>
      <BizHeader />
      <Body>
        <Outlet />
      </Body>
      <DefaultFooter />
    </BizLayoutContainer>
  );
};

export default BizLayout;

const BizLayoutContainer = styled.div`
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
  padding-top: 60px;
`;
