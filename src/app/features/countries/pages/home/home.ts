import { Component, computed, inject, resource, signal } from "@angular/core";
import { CardSkeleton } from "../../../../shared/components/card-skeleton/card-skeleton";
import { ErrorApi } from "../../../../shared/components/error-api/error-api";
import { SearchAndFilter } from "../../../../shared/components/search-and-filter/search-and-filter";
import { CountryCard } from "../../components/country-card/country-card";
import type { ICountry } from "../../models/countries.model";
import { CountryService } from "../../services/country-service";

@Component({
	selector: "app-home",
	imports: [SearchAndFilter, CountryCard, CardSkeleton, ErrorApi],
	templateUrl: "./home.html",
	styleUrl: "./home.css",
})
export class Home {
	private countryService = inject(CountryService);

	countries = signal<ICountry[]>([]);
	search = signal("");
	region = signal("");

	ref = resource({
		params: () => null,
		loader: async () => {
			const data = await this.countryService.getAllCountries();
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
