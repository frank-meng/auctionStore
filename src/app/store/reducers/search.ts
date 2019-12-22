import { Product, ProductSearchParams } from '../../shared';
import { SearchAction, SearchSuccessAction, SEARCH ,SEARCH_SUCCESS, SearchActions} from '../actions/search';
import { createReducer, on, Action } from '@ngrx/store';


export interface SearchState {
    searchQuery: ProductSearchParams,
    searchResults: Product[]
}

const initialState: SearchState = {
    searchQuery: {},
    searchResults: []
}
  

export function searchReducer(state = initialState, action: SearchActions): SearchState {
  console.log(` loading search  ${action.type} -- ${JSON.stringify(state)}`);

    switch (action.type) {
  
      case SEARCH: {
        return {
          ...state,
          searchQuery: action.payload.searchQuery,
          searchResults: []
        }
      }
  
      case SEARCH_SUCCESS: {
        return {
          ...state,
          searchResults: action.payload.searchResults
        }
      }
  
      default: {
        return state;
      }
    }
  }
  export const getData = (state: SearchState) => state.searchResults;
