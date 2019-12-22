import { Component, OnInit, Input, OnChanges, SimpleChange } from '@angular/core';
import { Product, BidService } from 'src/app/shared';
import { Subject, Observable, combineLatest, pipe } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { BidMessage } from 'src/app/shared/bid.service';

@Component({
  selector: 'nga-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})

export class ProductDetailComponent implements OnInit, OnChanges {
  ngOnInit(): void {

this.bidService.priceUpdates$.subscribe( pipe( s=>{
  console.log (s);
}));

    this.latestBids$ = combineLatest(                                         
      this.productChange$.pipe(startWith(this.product)),                     
      this.bidService.priceUpdates$.pipe(startWith<BidMessage | null>(null)),
      (product, bid) =>  bid && bid.productId === product.id ?               
                         bid.price: product.price                            
    );
  }
  ngOnChanges({ product }: { product: SimpleChange }) {

    console.log (` on change ${product}`);
    this.productChange$.next(product.currentValue); 
  }
  private readonly productChange$ = new Subject<Product>();
  latestBids$: Observable<number>;
  
  @Input() product: Product;
  constructor(private bidService: BidService) {} 

  placeBid(price: number) {
    this.bidService.placeBid(this.product.id, price);                         
   }


}
