import { Component, AfterViewInit} from '@angular/core';
import * as L from 'leaflet';
import {IssPosition, StationService} from '../../services/station.service';
import {Subscription} from 'rxjs';
import {Circle, Marker, PanOptions} from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  private map;
  private iss: Marker;
  private isscirc: Circle;
  private options: PanOptions =  new class implements PanOptions {
    animate: boolean = true;
  };

  private loadSubscription: Subscription;

  constructor(private stationService: StationService) { }

  ngAfterViewInit(): void {
    this.stationNow();
    this.initMap();

    setInterval(()=>this.stationNow(),5000);
  }


  stationNow(){
    this.loadSubscription = this.stationService.getStationLocation().subscribe((issNow) => {
      console.log(issNow);
      let lat = issNow.iss_position.latitude;
      let lon = issNow.iss_position.longitude;
      this.iss.setLatLng([lat, lon]);
      this.isscirc.setLatLng([lat, lon]);

      this.map.panTo([lat, lon], this.options );
    });
  }

  private initMap(): void {
    this.map = L.map('map', {center: [0, 0], zoom: 3 });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 5,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    var ISSIcon = this.getIssIcon();

    this.iss = L.marker([0, 0],{icon: ISSIcon}).addTo(this.map);
    this.isscirc = L.circle([0,0], 1500e3,{color: "#c22", opacity: 0.3, weight:1, fillColor: "#c22", fillOpacity: 0.1})
                    .addTo(this.map);

    tiles.addTo(this.map);
  }


  private getIssIcon() {
    return L.icon({
      iconUrl: 'assets/iss_icon.png',
      iconSize: [50, 30],
      iconAnchor: [25, 15],
      popupAnchor: [50, 25],
    });
  }
}
