import { ImageGalleryItem } from 'components/ImageGalleryItem';
import { ImageGalleryList } from './ImageGallery.styled';
import PropTypes from 'prop-types';

export const ImageGallery = ({ images, clickHandler }) => {
  return (
    <>
      <ImageGalleryList>
        {images.map((item, index) => (
          <ImageGalleryItem image={item} key={index} toggle={clickHandler} />
        ))}
      </ImageGalleryList>
    </>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object.isRequired),
  clickHandler: PropTypes.func.isRequired,
};
