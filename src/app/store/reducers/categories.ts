import { createReducer, on, Action } from '@ngrx/store';
import { CategoriesActions, LOAD_CATEGORIES, LOAD_CATEGORIES_SUCCESS } from '../actions';


export interface CategoriesState {
    categories: string[]
}

const initialState: CategoriesState = {
    categories: []
}
  

export function categoriesReducer(state = initialState, action: CategoriesActions): CategoriesState {
  console.log(` loading categories  ${action.type} -- ${JSON.stringify(state)}`);
  
  switch (action.type) {
  
      case LOAD_CATEGORIES: {
        return {
          ...state
        }
      }
  
      case LOAD_CATEGORIES_SUCCESS: {
        return {
          ...state,
          categories: action.payload.categories
        }
      }
  
      default: {
        return state;
      }
    }
  }

  export const getData = (state: CategoriesState) => state.categories;
