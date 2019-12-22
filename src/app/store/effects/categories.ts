import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType, Effect } from '@ngrx/effects';
import {map, switchMap} from 'rxjs/operators';

import {ProductService} from '../../shared/product.service';
import { CategoriesAction, LOAD_CATEGORIES, CategoriesSuccessAction } from '../actions';

@Injectable()
export class CategoriesEffects{
  @Effect()
    loadProducrts$ = this.actions$
    .pipe(
        ofType<CategoriesAction>(LOAD_CATEGORIES),
        switchMap(() => this.productService.getAllCategories()),
        map(categories => new CategoriesSuccessAction({categories: categories}))
        
    );


  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) {}
}