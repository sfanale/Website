import { Component, OnInit, ViewChild, Input } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource, Sort, MatSortModule} from '@angular/material';

import { Property} from "../property";
import { PropertyService} from "../property.service";
import {Observable,of as observableOf, merge, Subject} from "rxjs/index";
import {catchError, map, startWith, switchMap} from "rxjs/operators";

const propertiesConst: Property[]=[
  { id: 11, name: "Calvin's House", address:"", rent: 6000, price: 900000, return: 8 },
  { id: 12, name: "Stephen's House", address:"", rent: 3100, price: 550000, return: 6.76 },
  { id: 13, name: "6969 Easy Street #32", address:"", rent: 1200, price: 234000, return: 6.15  },
  { id: 14, name: "6969 Easy Street #33", address:"", rent: 1250, price: 256000, return: 5.86  },
  { id: 15, name: "6969 Easy Street #22", address:"", rent: 1100, price: 240000, return: 5.5  },
  { id: 16, name: "6969 Easy Street #23", address:"", rent: 1150, price: 225000, return: 6.13  },
  { id: 17, name: "6969 Easy Street #43", address:"", rent: 1350, price: 300000, return: 5.4  }
];




@Component({
  selector: 'app-research',
  templateUrl: './research.component.html',
  styleUrls: ['./research.component.css']
})

export class ResearchComponent implements OnInit {

  displayedColumns: string[] = ['name', 'rent', 'price', 'return'];
  dataSource: MatTableDataSource<Property>;
  properties: Property[];


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private propertyService: PropertyService) {
    //this.dataSource = new MatTableDataSource<Property>(this.properties);
    this.dataSource = new MatTableDataSource<Property>(propertiesConst);


    //this.dataSource = new MatTableDataSource();
  }

  ngOnInit() {
    //this.propertyService.getProperties().subscribe(properties => this.properties = properties);

    //this.propertyService.getProperties().subscribe(properties => this.dataSource = new MatTableDataSource<Property>(properties));

    //this.dataSource = new MatTableDataSource<Property>(this.properties)

    //this.dataSource = new MatTableDataSource<Property>(this.properties);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}





