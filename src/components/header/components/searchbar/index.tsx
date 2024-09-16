import styled from "styled-components";
import SearchSVG from "@/assets/icons/search.svg?react";

const Searchbar = () => {
  return (
    <SearchbarContainer>
      <InputWrapper>
        <Input placeholder="검색어를 입력해보세요!" />
        <IconWrapper>
          <SearchSVG />
        </IconWrapper>
      </InputWrapper>
    </SearchbarContainer>
  );
};

export default Searchbar;

const SearchbarContainer = styled.div``;

const InputWrapper = styled.div`
  width: 230px;
  height: 40px;
  padding: 8px 10px;
  border-radius: 8px;
  border: 1px solid #e0e0e2;
  background-color: white;
  display: flex;
  gap: 12px;
`;

const Input = styled.input`
  width: 176.4px;
  height: 24px;
  border: none;
  outline: none;
  font-weight: var(--font-regular);
  font-size: 16px;
  line-height: 150%;
  letter-spacing: 0.57%;

  ::placeholder {
    color: #e0e0e2;
  }
`;

const IconWrapper = styled.div`
  cursor: pointer;
`;
