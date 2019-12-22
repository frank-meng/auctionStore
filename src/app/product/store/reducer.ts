import { Product } from '../../shared';
import {  ProductActionTypes, ProductActions } from './action';

export interface ProductState {
  product: Product;
  suggestions: Product[];
  loading: boolean;
  loadingError?: string;
}

export const initialState: ProductState = {
  product: null,
  suggestions: [],
  loading: false
};



export function productReducer(state = initialState, action: ProductActions): ProductState {
  console.log(` loading product -- ${action.type}`);

  switch (action.type) {
    case ProductActionTypes.Load: {
      return {
        ...state,
        loading: true,
        loadingError: null
      };
    }

    case ProductActionTypes.LoadSuccess: {
      return {
        ...state,
        product: action.payload.product,
        loading: false,
        loadingError: null
      };
    }
    case ProductActionTypes.LoadSuggestedSuccess: {
      return {
        ...state,
        suggestions: action.payload.products
      };
    }

    case ProductActionTypes.LoadFailure: {
      return {
        ...state,
        product: null,
        loading: false,
        loadingError: action.payload.error
      };
    }

    default: {
      return state;
    }
  }
}
export const getData = (state: ProductState) => { 
   return state.product};

export const getSuggestions = (state: ProductState) => state.suggestions;
