import { useState, useEffect } from "react"
import "./App.css"
import Searchbar from "./components/Searchbar"
import ImageGallery from "./components/ImageGallery"
import Button from "./components/Button"
import imagesApi from "./services/imagesApi"
import Loader from "react-loader-spinner"
import Modal from "./components/Modal"

export default function App() {
  const [images, setImages] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [perPage, setPerPage] = useState(12)
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [largeUrl, setLargeUrl] = useState("")
  const [tag, setTag] = useState("")

  const onChangeQuery = (query) => {
    setSearchQuery(query)
    setImages([])
    setCurrentPage(1)
    setError(null)
  }

  const fetchImages = async () => {
    const options = {
      searchQuery,
      currentPage,
      perPage,
    }

    setIsLoaded(true)

    try {
      const response = await imagesApi.fetchData(options)

      setImages((prevState) => [...prevState, ...response])
      setCurrentPage((prevState) => prevState + 1)

      setIsLoaded(false)
    } catch (error) {
      setError(error)
    }
  }

  useEffect(() => {
    if (searchQuery === "") {
      return
    }

    fetchImages()
  }, [searchQuery])

  useEffect(() => {
    if (images.length > perPage) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      })
    }
  }, [images])

  const toggleModal = () => {
    setShowModal(!showModal)
  }

  const onImageClick = (e) => {
    if (e.target.nodeName !== "IMG") {
      return
    }

    setIsLoaded(true)
    setLargeUrl(e.target.dataset.url)
    setTag(e.target.alt)

    toggleModal()
  }

  const toggleLoader = () => {
    setIsLoaded(false)
  }

  const shouldRenderMoreButton = images.length > 0 && !isLoaded

  return (
    <div className="container">
      <Searchbar onSubmit={onChangeQuery} />

      {error && (
        <h2>
          Sorry something went wrong, try again later!(
          {error.message})
        </h2>
      )}

      <ImageGallery images={images} onClick={onImageClick} />

      {isLoaded && (
        <Loader type="Audio" color="#00BFFF" height={80} width={80} />
      )}

      {shouldRenderMoreButton && <Button onClick={fetchImages} />}

      {showModal && (
        <Modal onClose={toggleModal}>
          {isLoaded && (
            <Loader type="Audio" color="#00BFFF" height={80} width={80} />
          )}
          <img src={largeUrl} alt={tag} onLoad={toggleLoader} />
        </Modal>
      )}
    </div>
  )
}
