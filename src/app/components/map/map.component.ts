import {AfterViewInit, Component, OnDestroy} from '@angular/core';
import * as L from 'leaflet';
import {Circle, Marker, PanOptions} from 'leaflet';
import {StationService} from '../../services/station.service';
import {Subscription} from 'rxjs';
import {PassesService} from '../../services/passes.service';

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit, OnDestroy {
  private map;
  private iss: Marker;
  private circle: Circle;
  private options: PanOptions = new class implements PanOptions {
    animate = true;
  };

  private loadSubscription: Subscription;
  private interval;
  private popup: Marker;

  constructor(private stationService: StationService, private passesService: PassesService) { }

  ngAfterViewInit(): void {
    this.stationNow();
    this.initMap();

    this.interval = setInterval(() => this.stationNow(), 5000);
  }

  stationNow(): void {
    this.loadSubscription = this.stationService.getStationLocation().subscribe((issNow) => {
      console.log(issNow);
      const lat = issNow.iss_position.latitude;
      const lon = issNow.iss_position.longitude;
      this.iss.setLatLng([lat, lon]);
      this.circle.setLatLng([lat, lon]);

      this.map.panTo([lat, lon], this.options );
    });
  }

  private initMap(): void {
    this.map = L.map('map', {center: [0, 0], zoom: 3 });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 5,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    const ISSIcon = this.getIssIcon();

    this.iss = L.marker([0, 0], {icon: ISSIcon}).addTo(this.map);

    this.popup = L.marker([0, 0])
                  .addTo(this.map)
                  .bindPopup('click on map to choose location!')
                  .openPopup();

    this.circle = L.circle([0, 0], 1500e3,
      {color: '#c22', opacity: 0.3, weight: 1, fillColor: '#c22', fillOpacity: 0.1}).addTo(this.map);

    tiles.addTo(this.map);

    this.map.on('click', e => {
      console.log(e.latlng); // get the coordinates
      this.popup.setLatLng(e.latlng);
      this.passesService.latitude = e.latlng.lat;
      this.passesService.longitude = e.latlng.lng;
    });
  }

  private getIssIcon(): any {
    return L.icon({
      iconUrl: 'assets/iss_icon.png',
      iconSize: [50, 30],
      iconAnchor: [25, 15],
      popupAnchor: [50, 25],
    });
  }

  ngOnDestroy(): void {
   clearInterval(this.interval);
   console.log('destroy!!');
  }


}
