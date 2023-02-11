import { GalleryItem, GalleryImage } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ image }) => {
  return (
    <>
      <GalleryItem id={image.id}>
        <GalleryImage src={image.webformatURL} alt={image.tags} />
      </GalleryItem>
    </>
  );
};
