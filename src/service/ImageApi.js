function fetchImage(imageName, pageNumber) {
  const key = "19420354-3227e9c850ee70e183cd8e591";
  return fetch(
    `https://pixabay.com/api/?key=${key}&q=${imageName}&image_type=photo&per_page=12&page=${pageNumber}`
  ).then((r) => r.json());
}
const api = { fetchImage };
export default api;
