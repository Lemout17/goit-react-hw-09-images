import "./ImageGallery.css"
import ImageGalleryItem from "../ImageGalleryItem"
import PropTypes from "prop-types"

const ImageGallery = ({ images, onClick }) => (
  <ul className="ImageGallery" onClick={onClick}>
    {images.map(
      ({ id, webformatURL, largeImageURL, tags }) => (
        <ImageGalleryItem
          key={id}
          webformatURL={webformatURL}
          largeImageURL={largeImageURL}
          tags={tags}
        />
      )
    )}
  </ul>
)

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape).isRequired,
  onClick: PropTypes.func.isRequired,
}

export default ImageGallery
