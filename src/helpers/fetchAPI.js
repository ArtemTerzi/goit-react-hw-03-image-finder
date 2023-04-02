import axios from 'axios';

const API_KEY = '33730392-00e87f60b0c2dabc7d687ed2e';
axios.defaults.baseURL = `https://pixabay.com/api/`;

export const fetchData = async (q, page) => {
  const response = await axios.get(`?q=${q}`, {
    params: {
      key: API_KEY,
      page,
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: 12,
    },
  });

  return response.data;
};
