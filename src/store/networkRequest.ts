import axios from 'axios';
const baseUrl = 'https://fakestoreapi.com';

//getting all products from fake store api

export const fetchProduct = async () => {
  const url = `${baseUrl}/products`;
  const response = await axios.get(url);
  return response;
};

//getting individual products from fake store api

export const fetchSingleProduct = async (key?: any, id?: any) => {
  let itemId = key.queryKey[1];
  const url = `${baseUrl}/products/${itemId}`;
  const response = await axios.get(url);
  return response;
};

//getting categories from fake store api

export const fetchCategories = async () => {
  const url = `${baseUrl}/products/categories`;
  const response = await axios.get(url);
  return response;
};

//getting product based on category from fake store api

export const fetchCategoryProducts = async (key?: any, category?: any) => {
  let categoryName = key.queryKey[1];
  const url = `${baseUrl}/products/category/${categoryName}`;
  const response = await axios.get(url);
  return response;
};
