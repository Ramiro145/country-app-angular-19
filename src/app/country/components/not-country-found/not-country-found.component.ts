
import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

@Component({
  selector: 'country-not-found',
  imports: [],
  templateUrl: './not-country-found.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotCountryFoundComponent {

  location = inject(Location);


  goBack(){
    this.location.back();
  }

 }
