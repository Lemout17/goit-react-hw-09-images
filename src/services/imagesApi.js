import axios from "axios"

const apiKey = "21359619-d33abf781fc12db63121b07d3"

axios.defaults.baseURL = "https://pixabay.com/api/"

const fetchData = ({
  searchQuery = "",
  currentPage = 1,
  perPage,
}) => {
  return axios
    .get(
      `/?q=${searchQuery}&page=${currentPage}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=${perPage}`
    )
    .then((response) => response.data.hits)
}

export default { fetchData }
