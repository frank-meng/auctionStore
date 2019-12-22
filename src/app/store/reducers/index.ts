import { createFeatureSelector, createSelector, ActionReducerMap } from '@ngrx/store';

import * as fromCategories from './categories';
import * as fromSearch from './search';
import * as fromProducts from './product';


export interface HomeState {
    categories: fromCategories.CategoriesState;
    search: fromSearch.SearchState;
    products: fromProducts.State;

  }
  


  export const reducers :ActionReducerMap<HomeState, any>= {
    categories: fromCategories.categoriesReducer,
    search: fromSearch.searchReducer,
    products: fromProducts.reducer

  };

/**
 * Selectors
 */

export const getHomeState = createFeatureSelector<HomeState>('homePage');

export const getProductsState = createSelector(getHomeState, state => state.products);
//export const getProductsState = (state )=> state.products;

export const getProductsData = createSelector(getProductsState, fromProducts.getData);
export const getProductsDataLoading = createSelector(getProductsState, fromProducts.getDataLoading);
export const getProductsDataLoadingError = createSelector(getProductsState, fromProducts.getDataLoadingError);

export const getCategoriesState = createSelector(getHomeState, state => state.categories);
//export const getCategoriesState = (state) => state.categories;
export const getCategoriesData = createSelector(getCategoriesState, fromCategories.getData);

export const getSearchState = (state) => state.search;
export const getSearchData = createSelector(getSearchState, fromSearch.getData);
  
