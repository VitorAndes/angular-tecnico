import { Component, input } from "@angular/core";
import { RouterLink } from "@angular/router";
import { formatPopulationPipe } from "../../../../shared/utils/format-population";
import type { ICountry } from "../../models/countries.model";

@Component({
	selector: "app-country-card",
	imports: [RouterLink, formatPopulationPipe],
	templateUrl: "./country-card.html",
	styleUrl: "./country-card.css",
})
export class CountryCard {
	country = input<ICountry>();
}
