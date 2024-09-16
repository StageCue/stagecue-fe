import styled from "styled-components";

const AuthHeader = () => {
  return <AuthHeaderContainer>Header</AuthHeaderContainer>;
};

export default AuthHeader;

const AuthHeaderContainer = styled.div`
  width: 100%;
  height: 70px;
  padding: 17px;
  padding-left: 190px;
  background-color: #f7f7f7;
  display: flex;
  align-items: center;
  position: fixed;
`;
