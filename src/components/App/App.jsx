import { Component } from 'react';
import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import sass from './App.module.scss';

class App extends Component {
  state = {
    query: '',
  };

  handleSubmit = query => {
    this.setState({ query });
  };

  render() {
    return (
      <div className={sass.app}>
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery query={this.state.query} />
      </div>
    );
  }
}

export default App;
