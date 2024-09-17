import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Searchbar from "../components/searchbar";
import Button from "@/components/buttons/button";

const DefaultHeader = () => {
  const navigate = useNavigate();

  const handlePostPageClick = () => {
    navigate("/post");
  };

  const handleLoginClick = () => {
    navigate("/auth/login");
  };

  const handleBizClick = () => {
    navigate("/biz");
  };

  return (
    <DefaultHeaderContainer>
      <LeftSideWrapper>
        <Logo />
        <PostPageBtn onClick={handlePostPageClick}>모집공고</PostPageBtn>
      </LeftSideWrapper>
      <RightSideWrapper>
        <Searchbar />
        <Button
          variation="solid"
          btnClass="primary"
          width={114}
          height={32}
          padding="7px 14px"
          fontSize={13}
          onClick={handleLoginClick}
        >
          로그인/회원가입
        </Button>
        <Button
          variation="outlined"
          btnClass="assistive"
          width={102}
          height={32}
          padding="7px 14px"
          fontSize={13}
          onClick={handleBizClick}
        >
          극단주 서비스
        </Button>
      </RightSideWrapper>
    </DefaultHeaderContainer>
  );
};

export default DefaultHeader;

const DefaultHeaderContainer = styled.div`
  width: 100%;
  height: 70px;
  padding: 14px 190px;
  background-color: #f7f7f7;
  display: flex;
  align-items: center;
  position: fixed;
  justify-content: space-between;
`;

const LeftSideWrapper = styled.div`
  display: flex;
  gap: 40px;
`;

const RightSideWrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const Logo = styled.div`
  width: 65.92px;
  height: 25.6px;
  background-color: red;
`;

const PostPageBtn = styled.div`
  font-weight: var(--font-semibold);
  font-size: 16px;
  letter-spacing: 0.57%;
  line-height: 150%;
  color: #171719;
  cursor: pointer;
`;
