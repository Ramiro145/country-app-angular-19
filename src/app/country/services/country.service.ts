import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-countries.interfaces';
import { map, Observable, catchError, throwError, delay } from 'rxjs';
import { CountryMapper } from '../mappers/country.mapper';
import { Country } from '../interfaces/country.interface';

const API_URL = 'https://restcountries.com/v3.1';


@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private http = inject(HttpClient);



  searchByCapital(query:string):Observable<Country[]>{

    const lowerCaseQuery = query.toLowerCase();


    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${lowerCaseQuery}`).pipe(
      map((resp:RESTCountry[]) => CountryMapper.mapRestCountriesToCountries(resp)),
      catchError((err)=>{
        console.log('Error fetching', err);
        return throwError(()=> new Error(`No se pudo obtener paises con la capital ${query}`))
      })
    );


  }


  searchByCountry (query:string):Observable<Country[]>{

    const lowerCaseQuery = query.toLowerCase();

    return this.http.get<RESTCountry[]>(`${API_URL}/translation/${lowerCaseQuery}`).pipe(
      map((resp:RESTCountry[]) => CountryMapper.mapRestCountriesToCountries(resp)),
      delay(2000),
      catchError((err)=>{
        console.log('Error fetching', err);
        return throwError(()=> new Error(`No se pudo obtener paises con la query: ${query}`))
      })
    );

  }


  searchCountryByAlphaCode (code:string):Observable<Country>{

    return this.http.get<RESTCountry[]>(`${API_URL}/alpha/${code}`).pipe(
      map((resp:RESTCountry[]) => CountryMapper.mapRestCountriesToCountries(resp)),
      map(countries => countries[0]),
      catchError((err)=>{
        console.log('Error fetching', err);
        return throwError(()=> new Error(`No se pudo obtener pais con el codigo: ${code}`))
      })
    );

  }

}
