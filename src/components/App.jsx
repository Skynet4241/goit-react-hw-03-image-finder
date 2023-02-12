import { Component } from 'react';
import { ImageGallery } from './ImageGallery';
import { SearchBar } from './Searchbar';
import { Button } from './Button';
import { getImageList } from './API/API';
import { Modal } from './Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { settings } from './ToastSettings';
import { Loader } from './Loader/Loader';
import { Wrap } from './Button';
export class App extends Component {
  state = {
    images: [],
    loadButton: null,
    currentSearch: '',
    pageNumber: 1,
    loading: false,
    errorMessage: '',
    showModal: false,
    modalIMG: '',
  };

  onFormSubmit = async e => {
    e.preventDefault();
    const searchQuery = e.target.elements.input.value.trim().toLowerCase();
    if (!searchQuery.trim()) {
      toast.error('Please enter a non-empty query!', settings);
      return;
    }
    this.setState({
      images: [],
      currentSearch: searchQuery,
      loadButton: null,
    });
  };

  async componentDidUpdate(prevProps, prevState) {
    const { images, pageNumber, currentSearch } = this.state;
    const { currentSearch: prevQuery, pageNumber: prevPage } = prevState;

    if (prevQuery !== currentSearch || prevPage !== pageNumber) {
      try {
        this.setState({ loading: true });

        const { hits, totalHits } = await getImageList(
          currentSearch,
          pageNumber
        );

        if (hits.length === 0) {
          toast.error('We did not find an image for your query!', settings);
        }

        this.setState({
          loadButton: pageNumber < Math.ceil(totalHits / 12),
          images: [...images, ...hits],
        });
      } catch (error) {
        this.setState({ errorMessage: error.message });
      } finally {
        this.setState({ loading: false });
      }
    }
  }

  onLoadMoreClick = async () => {
    const { pageNumber } = this.state;
    this.setState({
      pageNumber: pageNumber + 1,
    });
  };

  onImageClick = url => {
    this.setState({ showModal: !this.state.showModal, modalIMG: url });
  };

  onCloseModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    return (
      <>
        <SearchBar onFormSubmit={this.onFormSubmit} />
        <ImageGallery
          images={this.state.images}
          clickHandler={this.onImageClick}
        />

        {this.state.loading && <Loader loading={this.state.loading} />}

        <Wrap>
          {this.state.loadButton && <Button onClick={this.onLoadMoreClick} />}
          <ToastContainer />
        </Wrap>
        {this.state.showModal && (
          <Modal
            image={this.state.modalIMG}
            alt={this.state.currentSearch}
            onClose={this.onCloseModal}
          />
        )}
      </>
    );
  }
}
