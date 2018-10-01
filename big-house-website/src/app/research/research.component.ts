import { Component, OnInit, ViewChild, Input } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource, Sort, MatSortModule} from '@angular/material';

import { Property} from "../property";
import { PropertyService} from "../property.service";




@Component({
  selector: 'app-research',
  templateUrl: './research.component.html',
  styleUrls: ['./research.component.css']
})

export class ResearchComponent implements OnInit {

  displayedColumns: string[] = ['name', 'rent', 'price', 'return'];
  dataSource: MatTableDataSource<Property>;
  properties: Property[];
  address = "616 drumheller rd, clemmons nc, 27012"; // there needs to be an address for now

  // todo map all properties on zoomed out US map


  constructor(private propertyService: PropertyService) {
    //this.dataSource = new MatTableDataSource<Property>(this.properties);

    //this.dataSource = new MatTableDataSource();
  }

  ngOnInit() {
    //this.propertyService.getProperties().subscribe(properties => this.properties = properties);

    this.getProperties();
    //this.dataSource = new MatTableDataSource<Property>(this.properties)

    //this.dataSource = new MatTableDataSource<Property>(this.properties);

  }

  getProperties() : void {
    this.propertyService.getProperties().subscribe(properties => this.properties= properties.slice(1,5));
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}





