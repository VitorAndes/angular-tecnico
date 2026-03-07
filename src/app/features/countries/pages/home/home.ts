import { ScrollingModule } from "@angular/cdk/scrolling";
import { Component, computed, inject, signal } from "@angular/core";
import { rxResource } from "@angular/core/rxjs-interop";
import { CardSkeleton } from "../../../../shared/components/card-skeleton/card-skeleton";
import { ErrorApi } from "../../../../shared/components/error-api/error-api";
import { SearchAndFilter } from "../../../../shared/components/search-and-filter/search-and-filter";
import { CountryCard } from "../../components/country-card/country-card";
import type { ICountry } from "../../models/countries.model";
import { CountryService } from "../../services/country-service";

@Component({
	selector: "app-home",
	imports: [
		SearchAndFilter,
		CountryCard,
		CardSkeleton,
		ErrorApi,
		ScrollingModule,
	],
	templateUrl: "./home.html",
	styleUrl: "./home.css",
})
export class Home {
	private countryService = inject(CountryService);

	search = signal("");
	region = signal("");

	ref = rxResource({
		stream: () => this.countryService.getAllCountries(),
	});

	filteredCountries = computed(() => {
		const countries: ICountry[] = this.ref.value() ?? [];
		const search = this.search().toLowerCase();
		const region = this.region();

		return countries.filter((country: ICountry) => {
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
