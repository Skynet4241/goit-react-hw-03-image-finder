import {
  Header,
  SearchForm,
  SearchButton,
  SearchButtonLabel,
  SearchFormInput,
} from './Searchbar.styled';
import PropTypes from 'prop-types';

export const SearchBar = ({ onFormSubmit }) => {
  return (
    <>
      <Header>
        <SearchForm onSubmit={onFormSubmit}>
          <SearchButton type="submit">
            <SearchButtonLabel>Search</SearchButtonLabel>
          </SearchButton>

          <SearchFormInput
            name="input"
            type="text"
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </SearchForm>
      </Header>
    </>
  );
};

SearchBar.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
};
