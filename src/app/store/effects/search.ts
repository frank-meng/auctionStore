import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType, Effect } from '@ngrx/effects';
import {map, switchMap, tap} from 'rxjs/operators';

import {ProductService} from '../../shared/product.service';
import { SEARCH, SearchAction, SearchSuccessAction, SearchActions } from '../actions/search';
import { Action } from '@ngrx/store';

@Injectable()
export class SearchEffects{
   @Effect()
    //loadProducrts$ = createEffect(()=> this.actions$
    loadProducrts$ = this.actions$.pipe(
        tap( s=> console.log(` search effect ACTION = ${s}`)),
        ofType<Action>(SEARCH),
        map((action:SearchAction) => action.payload.searchQuery),
        tap( s=> console.log(` search effect ${s}`)),
        switchMap((searchQuery) => this.productService.search(searchQuery)),
        map(products => new SearchSuccessAction({searchResults: products}))
        
    );


  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) {}
}