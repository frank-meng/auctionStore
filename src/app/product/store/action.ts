import { Action } from '@ngrx/store';
import { Product} from '../../shared';

export enum ProductActionTypes {
    Load = '[Product] Load ',
    LoadFailure = '[Product] Load  Failure',
    LoadSuccess = '[Product] Load  Success',
    LoadSuggested = '[Product] Load Suggested',
    LoadSuggestedSuccess = '[Product] Load Suggested Success'
  }


export class LoadProductById implements Action {
    readonly type = ProductActionTypes.Load;
    constructor(public readonly payload: { id: number }) {}

  }
  
  export class LoadProductByIdFailure implements Action {
    readonly type = ProductActionTypes.LoadFailure;
    constructor(public readonly payload: { error: string }) {}
  }
  
  export class LoadProductByIdSuccess implements Action {
    readonly type = ProductActionTypes.LoadSuccess;
    constructor(public readonly payload: { product: Product}) {}
  }

  export class LoadSuggested implements Action {
    readonly type = ProductActionTypes.LoadSuggested;
    constructor(public readonly payload: { id: number }) {}
  }
  
  export class LoadSuggestedSuccess implements Action {
    readonly type = ProductActionTypes.LoadSuggestedSuccess;
    constructor(public readonly payload: { products: Product[] }) {}
  }
  
  export type ProductActions
    = LoadProductById
    | LoadProductByIdFailure
    | LoadProductByIdSuccess
    | LoadSuggested
    | LoadSuggestedSuccess;
