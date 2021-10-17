import s from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';
import defaultImge from '../../images/wetrytofindwhatyouwant.jpg';

export default function ImageGalleryItem({
  onModal,
  webformatURL = defaultImge,
  tags = 'photo',
  image,
}) {
  return (
    <>
      <li className={s.ImageGalleryItem}>
        <img
          src={webformatURL}
          alt={tags}
          className={s.ImageGalleryItemImage}
          onClick={() => {
            onModal(image);
          }}
        />
      </li>
    </>
  );
}

ImageGalleryItem.propTypes = {
  onModal: PropTypes.func.isRequired,
};
