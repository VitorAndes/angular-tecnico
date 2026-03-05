import { Component, input } from "@angular/core";
import { RouterLink } from "@angular/router";
import type { ICountry } from "../../models/countries.model";

@Component({
	selector: "app-country-card",
	imports: [RouterLink],
	templateUrl: "./country-card.html",
	styleUrl: "./country-card.css",
})
export class CountryCard {
	country = input<ICountry>();

	formatPopulation(pop: number): string {
		if (pop >= 1_000_000_000) return `${(pop / 1_000_000_000).toFixed(1)}B`;
		if (pop >= 1_000_000) return `${(pop / 1_000_000).toFixed(1)}M`;
		if (pop >= 1_000) return `${(pop / 1_000).toFixed(1)}K`;
		return pop.toString();
	}
}
