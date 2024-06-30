import { Component } from 'react';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';

import css from './ImageGallery.module.css';

export default class ImageGallery extends Component {
  static propTypes = {
    images: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        image: PropTypes.shape({
          webformatURL: PropTypes.string.isRequired,
          largeImageURL: PropTypes.string.isRequired,
          tags: PropTypes.string,
        })
      })
    ).isRequired,
  };

  render() {
    const { images } = this.props;
    return (
      <ul className={css.imageGallery}>
        {images.map(image => (
          <ImageGalleryItem key={image.id} image={image} />
        ))}
      </ul>
    );
  }
}
