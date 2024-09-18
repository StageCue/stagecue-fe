import styled from "styled-components";

const AuthHeader = () => {
  return (
    <AuthHeaderContainer>
      <Logo src="https://s3.stagecue.co.kr/stagecue/troupe-logos/08c8c037-d47d-4ef7-9f05-42c97fa9ab5b.jpg" />
    </AuthHeaderContainer>
  );
};

export default AuthHeader;

const AuthHeaderContainer = styled.div`
  width: 100%;
  height: 60px;
  padding: 17px;
  padding-left: 190px;
  background-color: white;
  display: flex;
  align-items: center;
  position: fixed;
  z-index: 400;
  border-bottom: 1px solid #e1e2e4;
`;

const Logo = styled.img`
  width: 66px;
`;
