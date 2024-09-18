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
    navigate("/auth/starting");
  };

  const handleBizClick = () => {
    navigate("/biz");
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <DefaultHeaderContainer>
      <LeftSideWrapper>
        <Logo
          onClick={handleLogoClick}
          src="https://s3.stagecue.co.kr/stagecue/troupe-logos/08c8c037-d47d-4ef7-9f05-42c97fa9ab5b.jpg"
        />
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
  height: 60px;
  padding: 14px 190px;
  background-color: white;
  display: flex;
  align-items: center;
  position: fixed;
  justify-content: space-between;
  z-index: 400;
  border-bottom: 1px solid #e1e2e4;
`;

const LeftSideWrapper = styled.div`
  display: flex;
  gap: 40px;
  align-items: center;
`;

const RightSideWrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const Logo = styled.img`
  width: 66px;
  cursor: pointer;
`;

const PostPageBtn = styled.div`
  font-weight: var(--font-semibold);
  font-size: 16px;
  letter-spacing: 0.57%;
  line-height: 150%;
  color: #171719;
  cursor: pointer;
`;
