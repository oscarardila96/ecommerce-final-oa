import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { setIsLoading } from './loading.slice';

export const productsSlice = createSlice({
  name: 'products',
  initialState: [],
  reducers: {
    setProducts: (state, action) => {
      return action.payload
    },
    filterByPrice: (state, action) => {
      const { minPrice, maxPrice } = action.payload;
      return state.filter(product => product.price >= Number(minPrice) && product.price <= Number(maxPrice))
    },
    filterName: (state, action) => {
      const inputSearch = action.payload
      return state.filter(product => product.title.toLowerCase().includes(inputSearch.toLowerCase()))
    }
  }
})

export const getProductsThunk = () => (dispatch) => {
  dispatch(setIsLoading(true));
  axios.get("https://e-commerce-api.academlo.tech/api/v1/products")
    .then((res) => dispatch(setProducts(res.data.data.products)))
    .finally(() => dispatch(setIsLoading(false)));
}

export const filterProductsThunk = (id) => (dispatch) => {
  dispatch(setIsLoading(true));
  return axios.get(`https://e-commerce-api.academlo.tech/api/v1/products?category=${id}`)
    .then((res) => dispatch(setProducts(res.data.data.products)))
    .finally(() => dispatch(setIsLoading(false)));
}

export const filterProductNameThunk = (inputSearch) => (dispatch) => {
  dispatch(setIsLoading(true));
  return axios.get(`https://e-commerce-api.academlo.tech/api/v1/products?query=${inputSearch}`)
    .then((res) => dispatch(setProducts(res.data.data.products)))
    .finally(() => dispatch(setIsLoading(false)));
}

export const { setProducts, filterByPrice, filterName } = productsSlice.actions;

export default productsSlice.reducer;
