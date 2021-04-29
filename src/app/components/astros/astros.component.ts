import {Component, OnInit} from '@angular/core';
import {AstronautsInSpace} from '../../dto/astronautsInSpace';
import {StationService} from '../../services/station.service';

@Component({
  selector: 'app-astros',
  templateUrl: './astros.component.html',
  styleUrls: ['./astros.component.css']
})
export class AstrosComponent implements OnInit {

  astros: AstronautsInSpace;
  displayedColumns: string[] = ['position', 'name', 'craft'];

  constructor(private service: StationService) { }

  ngOnInit(): void {
    this.service.getAstronauts().subscribe((astronauts) => {
      this.astros = astronauts;
    });
  }

}
