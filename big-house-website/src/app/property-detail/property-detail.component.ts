import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import {PropertyService } from "../property.service";
import { Property } from "../property";

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.css']
})
export class PropertyDetailComponent implements OnInit {

  @Input() property: Property;

  getProperty(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.propertyService.getProperty(id).subscribe(property=> this.property = property);
  }

  goBack(): void{
    this.location.back();
  }

  save(): void {
    this.propertyService.updateProperty(this.property)
      .subscribe(() => this.goBack());
  }

  constructor(
    private location : Location,
    private propertyService: PropertyService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getProperty();



  }
}
