import {Component, Input} from '@angular/core';
import {PassesResponse} from '../../dto/passesresponse';

@Component({
  selector: 'app-passes',
  templateUrl: './passes.component.html',
  styleUrls: ['./passes.component.css']
})
export class PassesComponent{

  @Input() passesResponse: PassesResponse;

  constructor() { }

  show(): void{
    console.log(this.passesResponse);
  }

}
