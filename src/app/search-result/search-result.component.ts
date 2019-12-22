import { Component, ChangeDetectionStrategy } from '@angular/core';
import {Product,ProductService} from '../shared';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { HomeState, SearchAction, getSearchData } from '../store';

@Component({
  selector: 'nga-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class SearchResultComponent  {
  readonly products$: Observable<Product[]>;

  constructor(private store: Store<HomeState>,
    private route: ActivatedRoute) { 

      console.log(" CategoriesComponent init");
      this.products$ = this.store.pipe(select(getSearchData));
      
      this.route.queryParams.subscribe( 
        p =>  this.store.dispatch(new SearchAction({searchQuery: p})));

      
    }

}
