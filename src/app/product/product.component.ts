import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Product } from '../shared';
import { ActivatedRoute } from '@angular/router';
import { map, filter, switchMap, tap } from 'rxjs/operators';
import {  getProductData, getSuggestionsData } from './store';
import { Store, select } from '@ngrx/store';
import { LoadProductById, LoadSuggested } from './store/action';
import { State } from './store';
import * as fromRootStore from '../store';

@Component({
  selector: 'nga-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

  product$: Observable<Product>;
  suggestedProducts$: Observable<Product[]>;
  private readonly routeParamsSubscription: Subscription;

  constructor(
    private store: Store<State>,
    private route: ActivatedRoute
  ) {
    console.log (`ProductComponent  constructor`);

    //  const data = this.store.pipe(select(getProductData), map( p=> p.suggestions));
     this.product$ = this.store.pipe(select(getProductData));
     this.suggestedProducts$ = this.store.pipe(select(getSuggestionsData));
/*
     this.route.paramMap.subscribe(
      p => { 
        const selectedId = parseInt(p.get('productId') || '', 10);
      this.store.dispatch(new LoadProductById({id:selectedId}));
      this.store.dispatch(new LoadSuggested({ id:selectedId }));
     });
  */
    this.routeParamsSubscription = this.route.paramMap
     .pipe(
       map(params => parseInt(params.get('productId') || '', 10)),
       filter(productId => !!productId)
     )
     .subscribe(productId => {
      this.store.dispatch(new LoadProductById({id:productId}));
      this.store.dispatch(new LoadSuggested({ id:productId }));
     });
    //this.suggestedProducts$.subscribe( p => console.log(p));    
    console.log (`ProductComponent  constructor done`);
  }

}
