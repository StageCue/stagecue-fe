import styled from 'styled-components';
import SearchSVG from '@/assets/icons/search.svg?react';
import { useForm } from 'react-hook-form';
import useSearchStore from '@/store/search';

interface SearchBarInput {
  query: string;
}

const Searchbar = () => {
  const { register, handleSubmit } = useForm<SearchBarInput>();
  const { setSearchQuery } = useSearchStore();

  const onSubmitQuery = (data: SearchBarInput) => {
    setSearchQuery(data?.query);
  };

  return (
    <SearchbarContainer>
      <Form onSubmit={handleSubmit(onSubmitQuery)}>
        <InputWrapper>
          <Input {...register('query')} placeholder="검색어를 입력해보세요!" />
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
