import * as fromProduct from './reducer';

import { createFeatureSelector, createSelector } from '@ngrx/store';

export {productReducer as reducer, ProductState as State} from './reducer' ;


/**
Accessors for the data in the products state object
These accessors are used to create selectors defined in index.ts
We're defining these functions here to keep them where the State interface is declared
*/
export const getProductPage = createFeatureSelector<fromProduct.ProductState>('productPage');

export const getProductData =  createSelector(getProductPage,
        fromProduct.getData);

export const getDataLoading = createSelector(getProductPage,
  ( state: fromProduct.ProductState) => state.loading);
export const getDataLoadingError = createSelector(getProductPage,
  (state: fromProduct.ProductState) => state.loadingError);

export const getSuggestionsData =  createSelector(getProductPage,
  fromProduct.getSuggestions);