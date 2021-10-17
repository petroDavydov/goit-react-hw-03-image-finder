import { React, Component } from 'react';
// -----------------------------------------
import Container from '../Container/Container';
// -----------------------------------------
import LoaderTriangle from '../Loader/Loader';
// -----------------------------------------
import scrollToTarget from '../Scroll/Scroll';
// -----------------------------------------
import Button from '../Button/Button';
// -----------------------------------------
import Searchbar from '../Searchbar/Searchbar';
// -----------------------------------------
import ImageGallery from '../ImageGallery/ImageGallery';
// -----------------------------------------
import fetchImage from '../../Services/searchPicturesAPI';
// -----------------------------------------
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// -----------------------------------------
import Modal from '../Modal';
// -----------------------------------------
import Skeleton from '../Skeleton/Skeleton';
// -----------------------------------------
// import "./App.module.css";
// -----------------------------------------
// -----------------------------------------

class App extends Component {
  state = {
    page: 1,
    searchQuery: '',
    showModal: false,
    loadingSpiner: false,
    pixabayImages: [],
    largeImages: {},
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchQuery } = this.state;
    if (searchQuery !== prevState.searchQuery) {
      this.fetchImagePbay()
        .catch(error => console.log(error))
        .finally(() => this.setState({ loadingSpiner: false }));
    }
  }

  fetchImagePbay = () => {
    const { searchQuery, page } = this.state;
    this.setState({ loadingSpiner: true });
    return fetchImage(searchQuery, page).then(pixabayImages => {
      this.setState(prevState => ({
        pixabayImages: [...prevState.pixabayImages, ...pixabayImages],
        page: prevState.page + 1,
      }));
    });
  };

  handleLoadMoreClick = () => {
    this.setState({ loadingSpiner: true });
    this.fetchImagePbay()
      .then(() => {
        scrollToTarget();
      })
      .catch(error => console.log(error))
      .finally(() => this.setState({ loadingSpiner: false }));
  };

  handleFormSubmit = searchQuery => {
    this.setState({
      searchQuery,
      page: 1,
      pixabayImages: [],
    });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  clickImages = largeImage => {
    this.setState({ largeImage });
    this.toggleModal();
  };

  render() {
    const { showModal, searchQuery, pixabayImages, loadingSpiner, largeImage } =
      this.state;

    const { toggleModal, handleFormSubmit, clickImages, handleLoadMoreClick } =
      this;

    return (
      <>
        <ToastContainer />
        <Searchbar onSubmit={handleFormSubmit} />
        <Container>
          {pixabayImages.length !== 0 ? (
            <ImageGallery onModal={clickImages} pixabayImages={pixabayImages} />
          ) : (
            searchQuery !== '' && <Skeleton />
          )}
          {loadingSpiner && <LoaderTriangle />}

          {pixabayImages.length !== 0 && (
            <Button onClick={handleLoadMoreClick} />
          )}

          {showModal && (
            <Modal onModal={toggleModal}>
              {loadingSpiner && <LoaderTriangle />}
              <img src={largeImage.largeImageURL} alt={largeImage.tags} />
            </Modal>
          )}
        </Container>
      </>
    );
  }
}

export default App;
