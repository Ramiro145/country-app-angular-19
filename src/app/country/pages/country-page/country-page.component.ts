import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { CountryService } from '../../services/country.service';
import { of } from 'rxjs';
import { Country } from '../../interfaces/country.interface';
import { NotCountryFoundComponent } from "../../components/not-country-found/not-country-found.component";
import { CountryInformationComponent } from './country-information/country-information.component';

@Component({
  selector: 'app-country-page',
  imports: [NotCountryFoundComponent,CountryInformationComponent],
  templateUrl: './country-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryPageComponent implements OnInit{


  countryService = inject(CountryService);

  countryCode = inject(ActivatedRoute).snapshot.params['code'];


  codeSignal = signal<string>('');

  ngOnInit(): void {

    this.codeSignal.set(this.countryCode);
  }


  countryResource = rxResource<Country | null, string>({

    params: this.codeSignal,
    stream: ({params}) => {
      if(!params) return of(null)
      return this.countryService.searchCountryByAlphaCode(params);
    }

  })


}
