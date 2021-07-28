import React, { useState } from "react"
import "./Searchbar.css"
import PropTypes from "prop-types"

export default function Searchbar({ onSubmit }) {
  const [query, setQuery] = useState("")

  const handleChange = (e) => {
    setQuery(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    onSubmit(query)
    setQuery("")
  }

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={handleSubmit}>
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
        </button>

        <input
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={handleChange}
        />
      </form>
    </header>
  )
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}
