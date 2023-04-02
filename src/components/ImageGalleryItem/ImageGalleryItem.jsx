import sass from './ImageGalleryItem.module.scss';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ image, tags, showModal }) => {
  return (
    <li className={sass.imageGalleryItem}>
      <img
        src={image}
        alt={tags}
        className={sass.imageGalleryItemIMG}
        onClick={showModal}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  showModal: PropTypes.func.isRequired,
};
