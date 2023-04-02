import { Component } from 'react';
import sass from './Searchbar.module.scss';
import { IoSearchOutline } from 'react-icons/io5';
import PropTypes from 'prop-types';

class Searchbar extends Component {
  state = {
    value: '',
  };

  handleChange = ({ target: { value } }) => {
    this.setState({ value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.value);
  };

  render() {
    return (
      <header className={sass.searchbar}>
        <form className={sass.searchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={sass.searchFormButton}>
            <IoSearchOutline size={30} />
          </button>

          <input
            className={sass.searchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleChange}
            value={this.state.value}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
