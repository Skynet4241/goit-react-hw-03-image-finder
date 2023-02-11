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
    loadButton: null,
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
      const { hits, totalHits } = await getImageList(searchQuery, 1);

      this.setState({
        images: [...hits],
        currentSearch: searchQuery.toLowerCase(),
        pageNumber: 1,
        errorMessage: '',
        loadButton: this.state.pageNumber < Math.ceil(totalHits / 12),
      });
    } catch (error) {
      this.setState({ errorMessage: error.message });
    }
  };

  onLoadMoreClick = async () => {
    try {
      const { currentSearch, pageNumber } = this.state;
      const response = await getImageList(currentSearch, pageNumber + 1);
      console.log(response);
      this.setState({
        images: [...this.state.images, ...response.hits],
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
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {this.state.loadButton && <Button onClick={this.onLoadMoreClick} />}
          <ToastContainer />
        </div>
      </>
    );
  }
}
