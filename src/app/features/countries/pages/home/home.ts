import { Component, resource } from "@angular/core";
import { CardSkeleton } from "../../../../shared/components/card-skeleton/card-skeleton";
import { SearchAndFilter } from "../../../../shared/components/search-and-filter/search-and-filter";
import { CountryCard } from "../../components/country-card/country-card";

@Component({
	selector: "app-home",
	imports: [SearchAndFilter, CountryCard, CardSkeleton],
	templateUrl: "./home.html",
	styleUrl: "./home.css",
})
export class Home {
	ref = resource({
		params: () => null,
		loader: async () => {
			const [response] = await Promise.all([
				fetch(
					"https://restcountries.com/v3.1/all?fields=cca3,name,flags,population,region,subregion,capital,area,languages,currencies",
				),
				new Promise((r) => setTimeout(r, 800)),
			]);

			return response.json();
		},
	});
}
