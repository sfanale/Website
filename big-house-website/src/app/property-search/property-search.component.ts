import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import { Property } from '../property';
import { PropertyService } from '../property.service';



@Component({
  selector: 'app-property-search',
  templateUrl: './property-search.component.html',
  styleUrls: ['./property-search.component.css']
})
export class PropertySearchComponent implements OnInit {
  properties$: Observable<Property[]>;
  private searchTerms = new Subject<string>();

  constructor(private propertyService: PropertyService) { }

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
}

  ngOnInit() {
    this.properties$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term:string)=>this.propertyService.searchProperties(term)),
    );
  }

}
