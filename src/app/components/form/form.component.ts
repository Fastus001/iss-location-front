import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Passes} from '../../dto/passes';
import {PassesService} from '../../services/passes.service';
import {PassesResponse} from '../../dto/passesresponse';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  public form: FormGroup;
  public model = new Passes();
  public passesResponse: PassesResponse;

  constructor(private passesService: PassesService) { }

  ngOnInit(): void {
    const onlyNumsDoubles = Validators.pattern('^-?\\d{1,3}[.,]?\\d{0,}');
    this.form = new FormGroup(    {
        longitude: new FormControl('', [Validators.required , Validators.min(-180) , Validators.max(180), onlyNumsDoubles ] ),
        latitude: new FormControl('', [Validators.required , Validators.min(-80) , Validators.max(80), onlyNumsDoubles ]),
        altitude: new FormControl('', [Validators.min(0) , Validators.max(10000), Validators.pattern('\\d{1,5}') ]),
        number: new FormControl('', [Validators.min(1) , Validators.max(100), Validators.pattern('\\d{1,3}') ])
      }
    );
    if (this.passesService.longitude){
      this.form.setValue(
        {
          longitude: this.passesService.latitude,
          latitude: this.passesService.longitude,
          altitude: 100,
          number: 5
        });
    }
  }

  onSubmit(): any {
    this.model.longitude = this.form.controls.longitude.value;
    this.model.latitude = this.form.controls.latitude.value;
    this.model.altitude = this.form.controls.altitude.value;
    this.model.number = this.form.controls.number.value;
    this.passesService.getPasses(this.model).subscribe((x) => {
      this.passesResponse = x;
      console.log(x.response);
    });
  }

  public getLonErrorMessage(): string {
    if (this.form.hasError('required', 'longitude')){
      return 'You must enter longitude value';
    }

    if (this.form.hasError('min', 'longitude')){
      return 'Minimum value have to be -180 and up!';
    }

    if (this.form.hasError('max', 'longitude')){
      return 'Maximum value have to be 180 and below!';
    }

    if (this.form.hasError('pattern', 'longitude')){
      return 'only digits are allowed, and minus at the start';
    }

  }

  public getLatitudeErrorMessage(): string {
    if (this.form.hasError('required', 'latitude')){
      return 'You must enter latitude value';
    }

    if (this.form.hasError('pattern', 'latitude')){
      return 'only digits are allowed, and minus at the start';
    }

    if (this.form.hasError('min', 'latitude')){
      return 'Minimum value have to be -80 and up!';
    }

    if (this.form.hasError('max', 'latitude')){
      return 'Maximum value have to be 80 and below!';
    }
  }

  public getAltitudeErrorMessage(): string {
    if (this.form.hasError('min', 'altitude')){

      return 'Minimum value allowed is 0!';
    }
    if (this.form.hasError('max', 'altitude')){

      return 'Maximum value allowed is 10000!';
    }

    if (this.form.hasError('pattern', 'altitude')){
      return 'only digits are allowed';
    }
  }

  public getNumberErrorMessage(): string {
    if (this.form.hasError('min', 'number')){

      return 'Minimum value allowed is 1!';
    }
    if (this.form.hasError('max', 'number')){

      return 'Maximum value allowed is 100!';
    }

    if (this.form.hasError('pattern', 'number')){
      return 'only digits are allowed';
    }
  }
}
