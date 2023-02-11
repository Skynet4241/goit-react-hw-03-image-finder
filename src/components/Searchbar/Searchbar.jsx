import {
  Header,
  SearchForm,
  SearchButton,
  SearchButtonLabel,
  SearchFormInput,
} from './Searchbar.styled';

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
