import { Component, OnInit ,Output, EventEmitter} from '@angular/core';
import {FormGroup,FormBuilder,FormControl, Validators, ValidationErrors} from '@angular/forms'
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';

@Component({
  selector: 'nga-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  @Output() search = new EventEmitter();
  readonly matcher = new ShowOnFormInvalidStateMatcher();                
   readonly searchForm: FormGroup;
  
   constructor(fb: FormBuilder, private router: Router) { 
    this.searchForm = fb.group({
      title: [, Validators.minLength(2)],
      minPrice: [, Validators.min(0)],
      maxPrice: [, [Validators.min(0), Validators.max(10000)]]
    }, {
      validator: [ minLessThanMaxValidator ]
    });



   }

   onSearch() :void{
    if (this.searchForm.valid) {
      this.search.emit();                                                
       this.router.navigate([ '/search-result' ], {                      
         queryParams: withoutEmptyValues(this.searchForm.value)          
       });
    }
  }
}

export class ShowOnFormInvalidStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl, form: import("@angular/forms").FormGroupDirective | import("@angular/forms").NgForm): boolean {
    return !!((control && control.invalid) || (form && form.hasError('minLessThanMax')));
  }
  
}

function withoutEmptyValues(object: any): any {                          
  return Object.keys(object).reduce((queryParams: any, key) => {
   if (object[key]) { queryParams[key] = object[key]; }
   return queryParams;
 }, {});
}

function minLessThanMaxValidator(group: FormGroup) : ValidationErrors |null {
  const minPrice = group.controls["minPrice"].value;
  const maxPrice = group.controls["maxPrice"].value;

  if (minPrice && maxPrice){
    return minPrice<=maxPrice ? null: {minLessThanMax: true};
  }else{
    return null;
  }

}
