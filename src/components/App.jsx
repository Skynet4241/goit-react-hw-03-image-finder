import { Component } from 'react';
import { ImageGallery } from './ImageGallery';
import { SearchBar } from './Searchbar';
import { Button } from './Button';
import { getImageList } from './API/API';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { settings } from './ToastSettings/ToastSettings';
import { Loader } from './Loader/Loader';
import { Wrap } from './Button/Button.styled';
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
      const searchQuery = e.target.elements.input.value.trim().toLowerCase();
      this.setState({ loading: true });
      if (!searchQuery.trim()) {
        toast.error('Please enter a non-empty query!', settings);
        return;
      }
      const { hits } = await getImageList(searchQuery, this.state.pageNumber);

      this.setState({
        images: [...hits],
        currentSearch: searchQuery,
        pageNumber: 1,
        errorMessage: '',
      });
    } catch (error) {
      this.setState({ errorMessage: error.message });
    } finally {
      this.setState({ loading: false });
    }
  };

  async componentDidUpdate(prevProps, prevState) {
    const { pageNumber, currentSearch } = this.state;
    const { currentSearch: prevQuery, pageNumber: prevPage } = prevState;

    if (prevQuery !== currentSearch || prevPage !== pageNumber) {
      try {
        const { totalHits } = await getImageList(currentSearch, pageNumber);
        this.setState({
          loadButton: pageNumber < Math.ceil(totalHits / 12),
        });
      } catch (error) {
        toast.error(
          `Something is wrong, try to reload page! Error: ${error.message}`,
          settings
        );
      }
    }
  }

  onLoadMoreClick = async () => {
    try {
      this.setState({ loading: true });
      const { images, currentSearch, pageNumber } = this.state;
      const { hits } = await getImageList(currentSearch, pageNumber + 1);

      this.setState({
        images: [...images, ...hits],
        pageNumber: pageNumber + 1,
        errorMessage: '',
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

        {this.state.loading && <Loader loading={this.state.loading} />}

        <Wrap>
          {this.state.loadButton && <Button onClick={this.onLoadMoreClick} />}
          <ToastContainer />
        </Wrap>
      </>
    );
  }
}
