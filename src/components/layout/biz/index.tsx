import BizHeader from "@/components/header/biz";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

const BizLayout = () => {
  return (
    <BizLayoutContainer>
      <BizHeader />
      <Body>
        <Outlet />
      </Body>
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
  padding-top: 70px;
`;
