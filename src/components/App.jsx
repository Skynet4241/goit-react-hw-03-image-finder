import { Component } from 'react';
import { ImageGallery } from './ImageGallery';
import { SearchBar } from './Searchbar';
import { ImageGalleryItem } from './ImageGalleryItem';
import { Button } from './Button';
import { getImageList } from './API/API';
export class App extends Component {
  state = {
    images: [],
  };

  onFormSubmit = async e => {
    e.preventDefault();
    const response = await getImageList();

    this.setState({
      images: response,
    });
  };

  render() {
    return (
      <>
        <SearchBar onInputSubmit={this.onFormSubmit} />
        <ImageGallery>
          <ImageGalleryItem />
        </ImageGallery>
        <Button />
      </>
    );
  }
}
