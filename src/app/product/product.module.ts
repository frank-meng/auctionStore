import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductSuggestionComponent } from './product-suggestion/product-suggestion.component';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatGridListModule } from '@angular/material/grid-list';
import { StoreModule } from '@ngrx/store';
import { reducer } from './store';
import { EffectsModule } from '@ngrx/effects';
import { ProductEffects } from './store/effect';


@NgModule({
  declarations: [ProductComponent, ProductDetailComponent, ProductSuggestionComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatGridListModule,
    MatButtonModule,
    RouterModule.forChild([
      {path: '', component: ProductComponent}
    ]),

    StoreModule.forFeature('productPage', reducer),
    EffectsModule.forFeature([ ProductEffects ])
  ]
})
export class ProductModule { }
