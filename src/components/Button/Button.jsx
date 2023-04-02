import sass from './Button.module.scss';
import PropTypes from 'prop-types';

export const Button = ({ onLoadMore }) => {
  return (
    <button className={sass.button} onClick={onLoadMore}>
      Load More
    </button>
  );
};

Button.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
};
