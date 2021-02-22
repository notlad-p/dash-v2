import { useContext } from 'react';
import { motion } from 'framer-motion';
import styled, { ThemeContext } from 'styled-components';
import { SearchOutline } from '@styled-icons/evaicons-outline/SearchOutline';
import Widget from './Widget';

const SearchIconContainer = styled(motion.button)`
  display: inline-block;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 15%;
  border-radius: 5px;
  border: none;
  background-color: rgba(0, 0, 0, 0);
  outline: none;
  cursor: pointer;
`;

const SearchIcon = styled(SearchOutline)`
  color: ${({ theme }) => theme.color};
`;

const SearchForm = styled.form`
  width: 85%;
  height: 75%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 2px solid ${({ theme }) => theme.border};
  border-radius: 5px;
`;

const SearchInput = styled.input`
  height: 30px;
  width: 85%;
  padding: 10px;
  background-color: rgba(0, 0, 0, 0);
  color: ${({ theme }) => theme.color};
  border: none;
  font-size: 1.05rem;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: ${({ theme }) => theme.color};
  }
`;

const Search = () => {
  const theme = useContext(ThemeContext);

  return (
    <Widget >
      <SearchForm 
        action='https://www.google.com/search' 
        method='get' 
        autoComplete='off'
      >
        <SearchInput type='text' name='q' placeholder='Search...' />
        <SearchIconContainer
          type='submit'
          whileHover={{
            backgroundColor: theme.highlight,
          }}
          whileTap={{
            scale: .95,
          }}
        >
          <SearchIcon size='24' />
        </SearchIconContainer>
      </SearchForm>
    </Widget>
  )
}

export default Search;