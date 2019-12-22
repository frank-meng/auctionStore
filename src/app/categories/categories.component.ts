import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import {map,switchMap, tap} from 'rxjs/operators';

import {Product,ProductService} from '../shared';
import { Store, select } from '@ngrx/store';
import { CategoriesAction, LoadProducts, LoadProductsByCategory } from '../store/actions';
import { HomeState, getHomeState, getCategoriesState, getCategoriesData, getProductsData } from '../store';

@Component({
  selector: 'nga-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoriesComponent {
  categoriesNames$: Observable<string[]>;                   
  readonly products$: Observable<Product[]>;
  private readonly productsSubscription: Subscription;

  constructor(private store: Store<HomeState>,
    private route: ActivatedRoute) { 

      console.log(" CategoriesComponent init");
      this.products$ = this.store.pipe(select(getProductsData));

    //  this.store$ = store.select('homePage');  
      this.categoriesNames$ = this.store.pipe( 
        select(getCategoriesData),
        map(categories => ['all',...categories]))  ;                       

      this.productsSubscription = this.route.params.subscribe(
          ({ category }) => this.getCategory(category)
      );        

    this.store.dispatch(new CategoriesAction());
   }

   private getCategory(category: string): void {
    return category.toLowerCase() === 'all'
      ? this.store.dispatch(new LoadProducts())
      : this.store.dispatch(new LoadProductsByCategory({ category: category.toLowerCase() }));
  }
}
