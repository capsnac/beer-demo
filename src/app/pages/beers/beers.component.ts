import { Component, OnInit } from '@angular/core';
import { BeerModel } from 'src/app/models/beers.model';
import { BeersServices } from 'src/app/services/beers.service';

@Component({
  selector: 'app-beers',
  templateUrl: './beers.component.html',
  styleUrls: ['./beers.component.scss']
})
export class BeersComponent implements OnInit {

  public lstBeers: BeerModel[] = [];
  public lstBeerSearchedResult: BeerModel[] = [];
  public randomBeer = {} as BeerModel;
  searchName: string = "";
  searchType: string = "name";

  constructor(
    private beersService: BeersServices
  ) { }

  ngOnInit(): void {
    this.getRandomBeer();
    this.getBeers();
  }

  getBeers() {
    this.beersService.getAllBeers().subscribe((response: BeerModel[]) => {
      this.lstBeers = response;
      this.lstBeerSearchedResult = response;
    })
  }

  getNonAlcoholicRandomBeer() {
    let lstNonAlcoholicBeers = this.lstBeers.filter(x => x.abv <= 0.5);
    if (lstNonAlcoholicBeers.length > 0) {
      const random = Math.floor(Math.random() * lstNonAlcoholicBeers.length);
      this.randomBeer = lstNonAlcoholicBeers[random];
    }
  }

  getSearchResult() {

    var regexp = new RegExp("^[0-9A-Za-z_-]+$");
    if (!regexp.test(this.searchName)) {
      alert("Only numbers, letters, hypens, periods, spaces and underscores are allowed in the search box");
      return;
    }

    if (this.searchType == 'name') {
      this.lstBeerSearchedResult = this.lstBeers.filter(x => x.name.indexOf(this.searchName) >= 0);
    }
    else {
      this.lstBeerSearchedResult = this.lstBeers.filter(x => x.description.indexOf(this.searchName) >= 0);
    }

  }

  getRandomBeer(abv?: number) {
    this.beersService.getRandomBeers(abv).subscribe((response: BeerModel) => {
      this.randomBeer = response[0];
    })
  }
}
