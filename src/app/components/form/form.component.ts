import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  form: FormGroup = new FormGroup(    {
    longitude: new FormControl('longitude'),
    latitude: new FormControl('latitude'),
    altitude: new FormControl('altitude'),
    number: new FormControl('number')
    }
  )

  constructor() { }

  ngOnInit(): void {
  }

}
