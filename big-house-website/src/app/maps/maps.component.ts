import {Component, OnInit, Input, ViewChild, OnChanges} from '@angular/core';
import { } from '@types/googlemaps';


@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit, OnChanges {
  @Input() address: string;
  @ViewChild('gmap') gmapElement: any;
  detailmap: google.maps.Map;
  geocoder = new google.maps.Geocoder();

  ngOnInit() {

    var mapProp = {
      center: new google.maps.LatLng(28.4595, 77.0266),
      zoom: 14,
      mapTypeId: google.maps.MapTypeId.ROADMAP
      //mapTypeId: google.maps.MapTypeId.HYBRID
      // mapTypeId: google.maps.MapTypeId.SATELLITE
      // mapTypeId: google.maps.MapTypeId.TERRAIN
    };
    this.detailmap = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
    this.geocodeAddress(this.geocoder,this.detailmap);

    //var marker = new google.maps.Marker({ position: mapProp.center });
    //marker.setMap(this.map);

    //var infowindow = new google.maps.InfoWindow({
    //   content: "Hey, it's my house!"});
    // infowindow.open(this.map, marker);
    // }
  }
  ngOnChanges() {
    this.geocodeAddress(this.geocoder,this.detailmap);
  }

  geocodeAddress(geocoder, resultsMap) {
    geocoder.geocode({'address': this.address}, function(results, status) {
      if (status === 'OK') {
        resultsMap.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
          map: resultsMap,
          position: results[0].geometry.location
        });
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }
}

