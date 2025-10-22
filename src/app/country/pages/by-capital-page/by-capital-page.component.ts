import { ChangeDetectionStrategy, Component, inject, resource, ResourceLoaderParams, ResourceOptions, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country.interface';
import { firstValueFrom, of } from 'rxjs';

@Component({
  selector: 'app-by-capital-page',
  imports: [SearchInputComponent, CountryListComponent],
  templateUrl: './by-capital-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByCapitalPageComponent {

  countryService = inject(CountryService);


  query = signal<string>('');

  //metodo en angular 19 (experimental)

  //resource trabaja con promesas rxresource con observables

  //el tipado de rxResource es el valor esperado de retorno 'Country[]'
  // y string como el valor de la funcion reactiva procesada en el stream
  // (query) 'string' que seria el valor emitido
  countryResource = rxResource<Country[],string>({
    params: this.query,
    stream: ({params}) => {
      if(!params) return of([])
        return this.countryService.searchByCapital(params);
    }
  });


  // countryResource = resource({
  //   params:() => ({query: this.query()}),
  //   loader: async ({params}) => {

  //     if(!params.query) return [];

  //     transformar observables en promesas
  //     return await firstValueFrom(
  //       this.countryService.searchByCapital(params.query)
  //     );

  //   }
  // });


  //manejar errores, loading y respuesta de forma tradicional

  // isLoading = signal(false);
  // hasError = signal<string|null>(null);
  // countries = signal<Country[]>([]);

  // onSearch(query:string){
  //   if(this.isLoading()) return;

  //   this.isLoading.set(true);
  //   this.hasError.set(null);

  //   this.countryService.searchByCapital(query).subscribe({
  //     next:(countries)=>{
  //       this.isLoading.set(false)
  //       this.countries.set(countries)
  //     },
  //     error:(err)=>{
  //       this.isLoading.set(false),
  //       this.countries.set([])
  //       this.hasError.set(err)
  //     }
  //   });

  // }



}
