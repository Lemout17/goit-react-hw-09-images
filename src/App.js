import { Component } from "react"
import "./App.css"
import Searchbar from "./components/Searchbar"
import ImageGallery from "./components/ImageGallery"
import Button from "./components/Button"
import imagesApi from "./services/imagesApi"
import Loader from "react-loader-spinner"
import Modal from "./components/Modal"

class App extends Component {
  state = {
    images: [],
    currentPage: 1,
    perPage: 12,
    searchQuery: "",
    isLoaded: false,
    error: null,
    showModal: false,
    LargeUrl: "",
    tag: "",
  }

  componentDidUpdate(prevProps, prevState) {
    const { searchQuery, images, perPage } = this.state

    if (prevState.searchQuery !== searchQuery) {
      this.fetchImages()
    }

    if (images.length > perPage) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      })
    }
  }

  onChangeQuery = (query) => {
    this.setState({
      searchQuery: query,
      images: [],
      currentPage: 1,
      error: null,
    })
  }

  fetchImages = () => {
    const { currentPage, searchQuery, perPage } = this.state
    const options = {
      searchQuery,
      currentPage,
      perPage,
    }

    this.setState({
      isLoaded: true,
    })

    imagesApi
      .fetchData(options)
      .then((hits) =>
        this.setState((prevState) => ({
          images: [...prevState.images, ...hits],
          currentPage: prevState.currentPage + 1,
        }))
      )
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ isLoaded: false }))
  }

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }))
  }

  onImageClick = (e) => {
    console.log("Кликнули по картинке")
    if (e.target.nodeName !== "IMG") {
      return
    }

    this.setState(
      {
        largeUrl: e.target.dataset.url,
        tags: e.target.alt,
      },
      () => console.log(this.state.tags)
    )

    this.toggleModal()
  }

  render() {
    const {
      isLoaded,
      images,
      error,
      showModal,
      largeUrl,
      tag,
    } = this.state

    const shouldRenderMoreButton =
      images.length > 0 && !isLoaded

    return (
      <div className="container">
        <Searchbar onSubmit={this.onChangeQuery} />

        {error && (
          <h2>
            Sorry something went wrong, try again later!(
            {error.message})
          </h2>
        )}

        <ImageGallery
          images={images}
          onClick={this.onImageClick}
        />

        {isLoaded && (
          <Loader
            type="Audio"
            color="#00BFFF"
            height={80}
            width={80}
          />
        )}

        {shouldRenderMoreButton && (
          <Button onClick={this.fetchImages} />
        )}

        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={largeUrl} alt={tag} />
          </Modal>
        )}
      </div>
    )
  }
}

export default App
