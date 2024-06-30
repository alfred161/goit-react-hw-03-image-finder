import { Notify } from 'notiflix';
import { Component } from 'react';
import Button from './Button/Button';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Searchbar from './Searchbar/Searchbar';

import { getImagesFromAPI } from 'pixabay-api';
import css from './App.module.css';

export class App extends Component {
  state = {
    images: [],
    page: 1,
    query: '',
    isLoading: false,
    isError: false,
    isEnd: false,
  };

  async componentDidUpdate(_prevProps, prevState) {
    const { query, page } = this.state;

    if (prevState.query !== query || prevState.page !== page) {
      await this.fetchImages();
    }
  }

  handleSubmit = newQuery => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (newQuery === '' || newQuery === this.state.query) {
      Notify.info(`Please provide a new search query.`);
      return;
    } else {
      this.setState({
        query: newQuery,
        page: 1,
        images: [],
        isEnd: false,
      });
    }
  };

  handleLoadMore = () => {
    if (!this.state.isEnd) {
      this.setState(prevState => ({ page: prevState.page + 1 }));
    } else {
      Notify.info(`We're sorry but you reached the end of the search result. `);
    }
  };

  fetchImages = async () => {
    this.setState({ isLoading: true, isError: false });

    const { query, page } = this.state;

    try {
      const data = await getImagesFromAPI(query, page);
      const { totalHits, hits } = data;

      this.setState(prevState => ({
        images: page === 1 ? hits : [...prevState.images, ...hits],
        isLoading: false,
        isEnd: prevState.images.length + hits.length >= totalHits,
      }));

      if (hits.length === 0) {
        Notify.failure(`Sorry, there are no images matching your search.`);
        return;
      } else {
        if (page === 1) {
          Notify.success(`Hooray! We found ${totalHits} images.`);
        }
      }
    } catch (error) {
      this.setState({ isLoading: false, isError: true });
      Notify.failure(`An error occurred while fetching data: ${error}`);
    }
  };

  render() {
    const { images, isLoading, isError, isEnd } = this.state;

    return (
      <div className={css.app}>
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery images={images} />
        {isLoading && <Loader />}
        {!isLoading && !isError && images.length > 0 && !isEnd && (
          <Button onClick={this.handleLoadMore} />
        )}
        {isError &&
          Notify.failure(`Something went wrong. Please try again later.`)}
      </div>
    );
  }
}
