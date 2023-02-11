import { Component } from 'react';
import { ImageGallery } from './ImageGallery';
import { SearchBar } from './Searchbar';
import { Button } from './Button';
import { getImageList } from './API/API';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { settings } from './ToastSettings/ToastSettings';
import { Dna } from 'react-loader-spinner';
export class App extends Component {
  state = {
    images: [],
    loadButton: null,
    currentSearch: '',
    pageNumber: 1,
    loading: false,
  };

  onFormSubmit = async e => {
    e.preventDefault();
    try {
      this.setState({ loading: true });
      const searchQuery = e.target.elements.input.value.trim().toLowerCase();

      if (!searchQuery.trim()) {
        toast.error('Please enter a non-empty query!', settings);
        return;
      }
      const { hits, totalHits } = await getImageList(
        searchQuery,
        this.state.pageNumber
      );

      this.setState({
        images: [...hits],
        currentSearch: searchQuery,
        pageNumber: 1,
        errorMessage: '',
        loadButton: this.state.pageNumber < Math.ceil(totalHits / 12),
      });
    } catch (error) {
      this.setState({ errorMessage: error.message });
    } finally {
      this.setState({ loading: false });
    }
  };

  onLoadMoreClick = async () => {
    try {
      this.setState({ loading: true });
      const { images, currentSearch, pageNumber } = this.state;
      const { hits, totalHits } = await getImageList(
        currentSearch,
        pageNumber + 1
      );

      this.setState({
        images: [...images, ...hits],
        pageNumber: pageNumber + 1,
        errorMessage: '',
        loadButton: pageNumber + 1 < Math.ceil(totalHits / 12),
      });
    } catch (error) {
      this.setState({ errorMessage: error.message });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    return (
      <>
        <SearchBar onFormSubmit={this.onFormSubmit} />
        <ImageGallery images={this.state.images} />
        {this.state.loading && (
          <Dna
            visible={this.state.loading}
            height="80"
            width="80"
            ariaLabel="dna-loading"
            wrapperStyle={{
              display: 'flex',
              margin: '0 auto',
            }}
            wrapperClass="dna-wrapper"
          />
        )}

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {this.state.loadButton && <Button onClick={this.onLoadMoreClick} />}
          <ToastContainer />
        </div>
      </>
    );
  }
}
