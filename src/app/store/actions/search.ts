import { Action, createAction, props, union } from '@ngrx/store';
import {ProductSearchParams, Product} from '../../shared';

export const SEARCH = '[Product] search';
export const SEARCH_SUCCESS = '[Product] search success';

/*
export const SearchAction = createAction(SEARCH, 
   (payload: { searchQuery: ProductSearchParams }) =>({payload })
);


export const SearchSuccessAction = createAction(SEARCH_SUCCESS,
    (payload:{ searchResults: Product[] })=>({payload}) );

    const actions = union({
        SearchAction,
        SearchSuccessAction,
      });
      
      export type ActionsUnion = typeof actions;

*/
export class SearchAction implements Action {
    readonly type = SEARCH;

    constructor(public payload: { searchQuery: ProductSearchParams }) {}
}


export class SearchSuccessAction implements Action {
    readonly type = SEARCH_SUCCESS;
    searchResults :Product[];
    constructor(public payload: { searchResults: Product[] }) {
        this.searchResults = payload.searchResults;
    }
  }
  
  export type SearchActions = SearchAction | SearchSuccessAction;
  