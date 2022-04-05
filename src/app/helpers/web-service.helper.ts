import { environment } from "src/environments/environment";

export class WebServiceUrl{
    public static GET_ALL_BEERS: string = environment.apiUrl + "beers";
    public static GET_RANDOM_BEER: string = environment.apiUrl + "beers/random";
}