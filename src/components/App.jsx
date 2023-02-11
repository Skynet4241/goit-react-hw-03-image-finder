import { Component } from 'react';
import { ImageGallery } from './ImageGallery';
import { SearchBar } from './Searchbar';
import { Button } from './Button';
import { getImageList } from './API/API';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { settings } from './ToastSettings/ToastSettings';
export class App extends Component {
  state = {
    images: [],
    currentSearch: '',
    pageNumber: 1,
  };

  onFormSubmit = async e => {
    e.preventDefault();
    try {
      const searchQuery = e.target.elements.input.value.trim();
      if (!searchQuery.trim()) {
        toast.error('Please enter a non empty query!', settings);
        return;
      }
      const response = await getImageList(searchQuery, 1);
      this.setState({
        images: response,
        currentSearch: searchQuery.toLowerCase(),
        pageNumber: 1,
        errorMessage: '',
      });
    } catch (error) {
      this.setState({ errorMessage: error.message });
    }
  };

  onLoadMoreClick = async () => {
    try {
      const { currentSearch, pageNumber } = this.state;
      const response = await getImageList(currentSearch, pageNumber + 1);

      this.setState({
        images: [...this.state.images, ...response],
        pageNumber: this.state.pageNumber + 1,
        errorMessage: '',
      });
    } catch (error) {
      this.setState({ errorMessage: error.message });
    }
  };

  render() {
    return (
      <>
        <SearchBar onFormSubmit={this.onFormSubmit} />
        <ImageGallery images={this.state.images} />
        <Button onClick={this.onLoadMoreClick} />
        <ToastContainer />
      </>
    );
  }
}
