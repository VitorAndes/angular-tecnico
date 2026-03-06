import { KeyValuePipe } from "@angular/common";
import { Component, inject, resource } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { map } from "rxjs";
import { DetailSkeleton } from "../../../../shared/components/detail-skeleton/detail-skeleton";
import type { IBorderCountry, ICountry } from "../../models/countries.model";

@Component({
	selector: "app-country-detail",
	imports: [RouterModule, KeyValuePipe, DetailSkeleton],
	templateUrl: "./country-detail.html",
	styleUrl: "./country-detail.css",
})
export class CountryDetail {
	private route = inject(ActivatedRoute);

	countryCode = toSignal(
		this.route.paramMap.pipe(map((params) => params.get("code"))),
	);

	ref = resource({
		params: () => this.countryCode(),

		loader: async ({ params }) => {
			if (!params) return null;

			const [response] = await Promise.all([
				fetch(
					`https://restcountries.com/v3.1/alpha/${params}?fields=cca3,name,flags,population,region,subregion,capital,area,languages,currencies,timezones,borders`,
				),

				new Promise((r) => setTimeout(r, 800)),
			]);

			const countryData: ICountry = await response.json();

			let borders: IBorderCountry[] = [];

			if (countryData?.borders?.length) {
				const bordersResponse = await fetch(
					`https://restcountries.com/v3.1/alpha?codes=${countryData.borders.join(",")}&fields=cca3,name,flags`,
				);

				borders = await bordersResponse.json();
			}
			return {
				countryData,
				borders,
			};
		},
	});

	formatPopulation(pop: number): string {
		if (pop >= 1_000_000_000) return `${(pop / 1_000_000_000).toFixed(1)}B`;
		if (pop >= 1_000_000) return `${(pop / 1_000_000).toFixed(1)}M`;
		if (pop >= 1_000) return `${(pop / 1_000).toFixed(1)}K`;
		return pop.toString();
	}
}
