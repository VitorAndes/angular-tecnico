import { Component } from "@angular/core";
import { SearchAndFilter } from "../../../../shared/components/search-and-filter/search-and-filter";
import { CountryCard } from "../../components/country-card/country-card";

@Component({
	selector: "app-home",
	imports: [SearchAndFilter, CountryCard],
	templateUrl: "./home.html",
	styleUrl: "./home.css",
})
export class Home {}
