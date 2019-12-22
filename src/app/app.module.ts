import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { routerReducer } from '@ngrx/router-store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductService } from './shared';
import { environment } from '../environments/environment';

import { SearchComponent } from './search/search.component';
import { CategoriesComponent } from './categories/categories.component';
import { ProductGridComponent } from './product-grid/product-grid.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTabsModule } from '@angular/material/tabs';
import { Route, RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CategoriesEffects,  reducers, ProductsEffects, SearchEffects } from './store';
import { SearchResultComponent } from './search-result/search-result.component';
import { API_BASE_URL, WS_URL } from './app.token';

const routes: Route[] = [
  { path: '', pathMatch: 'full', redirectTo: 'categories' },
  { path: 'search-result', component: SearchResultComponent },
  {
    path: 'categories',
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'all' },
      { path: ':category', component: CategoriesComponent }
    ]
  },
  {
    path: 'products/:productId',
    loadChildren: './product/product.module#ProductModule'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    CategoriesComponent,
    ProductGridComponent,
    SearchComponent,
    SearchResultComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,

    BrowserAnimationsModule,
    HttpClientModule,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,

    RouterModule.forRoot(routes),
    MatGridListModule,
    MatTabsModule,
    StoreModule.forRoot({router: routerReducer }),
    StoreModule.forFeature('homePage', reducers),

    StoreDevtoolsModule.instrument({
      maxAge: 25,                            
       logOnly: environment.production       
   }),
    EffectsModule.forRoot([ CategoriesEffects , ProductsEffects, SearchEffects])
  ],
  providers: [ProductService,  
    { provide: API_BASE_URL, useValue: environment.apiBaseUrl },
    { provide: WS_URL, useValue: environment.wsUrl}],
  bootstrap: [AppComponent]
})
export class AppModule { }
