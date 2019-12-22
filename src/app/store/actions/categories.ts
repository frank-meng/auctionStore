import { Action, createAction, props, union } from '@ngrx/store';
import {ProductSearchParams, Product} from '../../shared';

export const LOAD_CATEGORIES = '[Categories] load';
export const LOAD_CATEGORIES_SUCCESS = '[Categories] load success';

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
export class CategoriesAction implements Action {
    readonly type = LOAD_CATEGORIES;

    constructor() {}
}


export class CategoriesSuccessAction implements Action {
    readonly type = LOAD_CATEGORIES_SUCCESS;
    constructor(public payload: { categories: string[] }) {        
    }
  }
  
  export type CategoriesActions = CategoriesAction | CategoriesSuccessAction;
  