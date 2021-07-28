import { Component } from "react"
import { createPortal } from "react-dom"
import PropTypes from "prop-types"
import "./Modal.css"

const modalRoot = document.querySelector("#modal-root")

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener("keydown", this.handleKeydown)
  }
  componentWillUnmount() {
    window.removeEventListener(
      "keydown",
      this.handleKeydown
    )
  }

  handleKeydown = (e) => {
    if (e.code === "Escape") {
      this.props.onClose()
    }
  }

  handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      this.props.onClose()
    }
  }

  render() {
    return createPortal(
      <div
        className="Overlay"
        onClick={this.handleBackdropClick}
      >
        <div className="Modal">{this.props.children}</div>
      </div>,
      modalRoot
    )
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
}
