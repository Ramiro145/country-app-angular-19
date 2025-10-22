import { ChangeDetectionStrategy, Component, inject, resource, signal } from '@angular/core';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { firstValueFrom, of } from 'rxjs';
import { CountryService } from '../../services/country.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-country',
  imports: [SearchInputComponent, CountryListComponent],
  templateUrl: './by-country.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByCountryComponent {

  countryService = inject(CountryService);


  query = signal<string>('');

  //metodo en angular 19 (experimental)

  countryResource = rxResource<Country[],string>({
    params: this.query,
    stream: ({params}) => {
      if(!params) return of([])
        return this.countryService.searchByCountry(params);
    }
  });

  // countryResource = resource({
  //   params:() => ({query: this.query()}),
  //   loader: async ({params}) => {

  //     if(!params.query) return [];

  //     //transformar observables en promesas
  //     return await firstValueFrom(
  //       this.countryService.searchByCountry(params.query)
  //     );

  //   }
  // });


}
