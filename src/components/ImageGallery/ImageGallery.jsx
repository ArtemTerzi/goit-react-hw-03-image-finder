import { Component } from 'react';
import sass from './ImageGallery.module.scss';
import ImageGalleryItem from 'components/ImageGalleryItem';
import { fetchData } from 'helpers/fetchAPI';
import Button from 'components/Button';
import Loader from 'components/Loader';
import Modal from 'components/Modal';
import PropTypes from 'prop-types';
import Error from 'components/Error';

class ImageGallery extends Component {
  state = {
    images: [],
    page: 1,
    status: 'idle',
    isModalOpen: false,
    modalImg: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const { page, images } = this.state;
    try {
      if (page !== prevState.page && page !== 1) {
        fetchData(this.props.query, page).then(response => {
          this.setState({
            images: [...images, ...response.hits],
            status: 'resolved',
          });
        });
      }

      if (prevProps.query !== this.props.query) {
        fetchData(this.props.query, 1).then(response => {
          if (!response.hits.length) {
            this.setState({ status: 'rejected' });
            return;
          }

          this.setState({
            images: response.hits,
            status: 'resolved',
            page: 1,
          });

          if (response.totalHits === images.length + response.hits.length) {
            this.setState({ status: 'idle' });
          }
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  onLoadMore = () => {
    this.setState({ status: 'pending', page: this.state.page + 1 });
  };

  showModal = e => {
    this.setState({ isModalOpen: true });
    this.largeItemFinder(e);
  };

  closeModal = e => {
    if (e.target === e.currentTarget) this.setState({ isModalOpen: false });
  };

  largeItemFinder = e => {
    const seachItem = this.state.images.find(
      el => el.webformatURL === e.target.src
    );
    const largeImage = seachItem.largeImageURL;
    this.setState({ modalImg: largeImage });
  };

  render() {
    const { status, images, modalImg, isModalOpen } = this.state;
    return (
      <>
        <ul className={sass.imageGallery}>
          {this.state.images.map(({ id, webformatURL, tags }) => {
            return (
              <ImageGalleryItem
                key={id}
                image={webformatURL}
                tags={tags}
                showModal={this.showModal}
              />
            );
          })}
        </ul>
        {status === 'pending' && <Loader />}
        {status !== 'idle' && status !== 'pending' && images.length !== 0 && (
          <Button onLoadMore={this.onLoadMore} />
        )}
        {status === 'rejected' && <Error />}
        {isModalOpen && (
          <Modal largeImage={modalImg} closeModal={this.closeModal} />
        )}
      </>
    );
  }
}

ImageGallery.propTypes = {
  query: PropTypes.string.isRequired,
};

export default ImageGallery;
