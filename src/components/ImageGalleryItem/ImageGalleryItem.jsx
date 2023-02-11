import { GalleryItem, GalleryImage } from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ image, toggle }) => {
  return (
    <>
      <GalleryItem id={image.id}>
        <GalleryImage
          src={image.webformatURL}
          alt={image.tags}
          onClick={() => toggle(image.largeImageURL)}
        />
      </GalleryItem>
    </>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    id: PropTypes.number.isRequired,
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
  toggle: PropTypes.func.isRequired,
};
