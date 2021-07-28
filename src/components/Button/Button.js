import "./Button.css"
import PropTypes from "prop-types"

const Button = ({ onClick }) => (
  <button className="Button" onClick={onClick}>
    Load more
  </button>
)

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
}

export default Button
