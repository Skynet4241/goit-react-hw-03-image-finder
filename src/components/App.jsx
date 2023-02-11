import { Component } from 'react';
import { ImageGallery } from './ImageGallery';
import { SearchBar } from './Searchbar';
import { Button } from './Button';
import { getImageList } from './API/API';
export class App extends Component {
  state = {
    images: [],
    currentSearch: '',
    pageNumber: 1,
  };

  onFormSubmit = async e => {
    e.preventDefault();

    const searchQuery = e.target.elements.input.value;
    const response = await getImageList(searchQuery, 1);
    this.setState({
      images: response,
      currentSearch: searchQuery,
      pageNumber: 1,
    });
  };

  onLoadMoreClick = async () => {
    const { currentSearch, pageNumber } = this.state;
    const response = await getImageList(currentSearch, pageNumber + 1);

    this.setState({
      images: [...this.state.images, ...response],
      pageNumber: this.state.pageNumber + 1,
    });
  };

  render() {
    return (
      <>
        <SearchBar onFormSubmit={this.onFormSubmit} />
        <ImageGallery images={this.state.images} />
        <Button onClick={this.onLoadMoreClick} />
      </>
    );
  }
}
