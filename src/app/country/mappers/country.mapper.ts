import { Country } from "../interfaces/country.interface";
import { RESTCountry } from "../interfaces/rest-countries.interfaces";

export class CountryMapper{

  //static RestCountry = Country
  public static mapRestCountryToCountry(item:RESTCountry):Country{
    return {
      cca2: item.cca2,
      flag: item.flag,
      flagSvg:item.flags.svg,
      name:item.name.common,
      capital:item.capital[0],
      population:item.population,
    }
  }

  //static RestCountry = Country[]
  public static mapRestCountriesToCountries(item:RESTCountry[]):Country[]{
    return item.map((RestCountry) => this.mapRestCountryToCountry(RestCountry));
  }

}
