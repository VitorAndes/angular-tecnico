import { Component, computed, resource, signal } from "@angular/core";
import { CardSkeleton } from "../../../../shared/components/card-skeleton/card-skeleton";
import { SearchAndFilter } from "../../../../shared/components/search-and-filter/search-and-filter";
import { CountryCard } from "../../components/country-card/country-card";
import type { ICountry } from "../../models/countries.model";

@Component({
	selector: "app-home",
	imports: [SearchAndFilter, CountryCard, CardSkeleton],
	templateUrl: "./home.html",
	styleUrl: "./home.css",
})
export class Home {
	countries = signal<ICountry[]>([]);

	search = signal("");
	region = signal("");

	ref = resource({
		params: () => null,
		loader: async () => {
			const [response] = await Promise.all([
				fetch(
					"https://restcountries.com/v3.1/all?fields=cca3,name,flags,population,region,subregion,capital,area,languages,currencies",
				),
			]);

			const data = await response.json();
			this.countries.set(data);

			return data;
		},
	});

	filteredCountries = computed(() => {
		const search = this.search().toLowerCase();
		const region = this.region();

		return this.countries().filter((country: ICountry) => {
			const matchesSearch = country.name.common.toLowerCase().includes(search);

			const matchesRegion = region ? country.region === region : true;

			return matchesSearch && matchesRegion;
		});
	});

	handleFilter(filters: { search: string; region: string }) {
		this.search.set(filters.search);
		this.region.set(filters.region);
	}
}
