import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import SearchSVG from '@/assets/icons/search.svg?react';
import useSearchStore from '@/store/search';

const Searchbar = () => {
  const navigate = useNavigate();
  const { query, setSearchQuery } = useSearchStore();
  const [inputValue, setInputValue] = useState(query); // 초기값을 query로 설정
  const timerRef = useRef<NodeJS.Timeout | null>(null); // useRef로 변경

  const onSubmitQuery = (e: React.FormEvent) => {
    e.preventDefault();

    if (timerRef?.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setSearchQuery(inputValue);
    navigate('/casts');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    if (timerRef?.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      setSearchQuery(value);
    }, 300);
  };

  // 컴포넌트 언마운트 시 타이머 정리
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  // query가 외부에서 변경될 때 inputValue 동기화
  useEffect(() => {
    setInputValue(query);
  }, [query]);

  return (
    <SearchbarContainer>
      <Form onSubmit={onSubmitQuery}>
        <InputWrapper>
          <Input
            value={inputValue} // inputValue로 변경
            onChange={handleInputChange}
            placeholder="검색어를 입력해보세요!"
          />
          <IconWrapper type="submit">
            <SearchSVG />
          </IconWrapper>
        </InputWrapper>
      </Form>
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

  &::placeholder {
    color: #e0e0e2;
  }
`;

const IconWrapper = styled.button`
  cursor: pointer;
  border: none;
  background-color: white;
`;

const Form = styled.form``;
