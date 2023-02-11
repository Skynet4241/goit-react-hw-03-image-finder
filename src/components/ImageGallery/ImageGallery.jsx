import { ImageGalleryItem } from 'components/ImageGalleryItem';
import { ImageGalleryList } from './ImageGallery.styled';
export const ImageGallery = ({ images }) => {
  return (
    <>
      <ImageGalleryList>
        {images.map((item, index) => (
          <ImageGalleryItem image={item} key={index} />
        ))}
      </ImageGalleryList>
    </>
  );
};
