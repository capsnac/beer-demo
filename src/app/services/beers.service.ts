import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { WebServiceUrl } from "../helpers/web-service.helper";

@Injectable()
export class BeersServices {
    constructor(
        private http: HttpClient
    ) { }

    getAllBeers() {
        return this.http.get(WebServiceUrl.GET_ALL_BEERS + "?page=1&per_page=80");
    }

    getRandomBeers(abv?: number) {
        return this.http.get(WebServiceUrl.GET_RANDOM_BEER + (abv == 0 ? "?abv_lt=1" : ""));
    }
}