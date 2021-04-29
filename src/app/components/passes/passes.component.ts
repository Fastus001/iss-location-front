import {Component, Input} from '@angular/core';
import {Responses} from '../../dto/responses';

@Component({
  selector: 'app-passes',
  templateUrl: './passes.component.html',
  styleUrls: ['./passes.component.css']
})
export class PassesComponent{

  @Input() responses: Responses;
  displayedColumns: string[] = ['position', 'duration', 'risetime'];

  constructor() { }

}
