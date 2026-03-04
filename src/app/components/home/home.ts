import { Component } from "@angular/core";
import { CountryCard } from "../country-card/country-card";
import { SearchAndFilter } from "../search-and-filter/search-and-filter";

@Component({
	selector: "app-home",
	imports: [SearchAndFilter, CountryCard],
	templateUrl: "./home.html",
	styleUrl: "./home.css",
})
export class Home {}
