import axios from 'axios';
const baseUrl = 'https://fakestoreapi.com';

export const fetchProduct = async () => {
  const url = `${baseUrl}/products`;
  const response = await axios.get(url);
  return response;
};

export const fetchSingleProduct = async (key?: any, id?: any) => {
  let itemId = key.queryKey[1];
  const url = `${baseUrl}/products/${itemId}`;

  const response = await axios.get(url);

  return response;
};
