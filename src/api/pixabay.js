import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api';
axios.defaults.params = {
  key: '22909528-f64cd92665831d6faf8601377',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  per_page: 12,
};

const fetchImages = async ({ query: q, page }) => {
  const { data } = await axios('', { params: { q, page } });

  return data;
};

export { fetchImages };
