import { GalleryItem, GalleryImage } from './ImageGalleryItem.styled';

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
