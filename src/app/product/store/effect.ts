import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { Product, ProductService } from '../../shared';
import {
  LoadProductByIdFailure,
  LoadProductByIdSuccess,
  ProductActionTypes,
  LoadProductById,
  LoadSuggestedSuccess,
} from './action';


@Injectable()
export class ProductEffects {

  constructor(
    private readonly actions$: Actions,
    private readonly productService: ProductService) {}

  @Effect()
  loadProductById$: Observable<Action> = this.actions$
    .pipe(
      ofType(ProductActionTypes.Load),
      tap(s=>console.log(' produce effect ')),
      map( (a:LoadProductById) => a.payload.id),
      switchMap((id) => this.productService.getById(id)),
      map(product => new LoadProductByIdSuccess({ product })),
      catchError(error => of(new LoadProductByIdFailure({ error })))
    );
  
    @Effect()
  loadSuggested$: Observable<Action> = this.actions$
    .pipe(
      ofType(ProductActionTypes.LoadSuggested),
      switchMap(() => this.productService.getAll()),
      map(products => new LoadSuggestedSuccess({ products })),
      catchError(error => {
        // Error with loading suggested products doesn't break user's workflow,
        // so we basically ignore it and return an empty array.
        console.error(`Error while suggested products: ${error}`);
        return of(new LoadSuggestedSuccess({ products: [] }));
      })
    );
}

