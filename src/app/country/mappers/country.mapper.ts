import { Country } from "../interfaces/country.interface";
import { RESTCountry } from "../interfaces/rest-countries.interfaces";

export class CountryMapper{

  //static RestCountry = Country
  public static mapRestCountryToCountry(item:RESTCountry):Country{
    return {
      cca2: item.cca2,
      flag: item.flag,
      flagSvg:item.flags.svg,
      name:item.translations['spa'].official ?? 'No spanish name',
      capital:item.capital[0],
      population:item.population,
      coatOfArmsSvg:item.coatOfArms.svg,
      CoatOfArmsPng:item.coatOfArms.png
    }
  }

  //static RestCountry = Country[]
  public static mapRestCountriesToCountries(item:RESTCountry[]):Country[]{
    return item.map((RestCountry) => this.mapRestCountryToCountry(RestCountry));
  }

}
