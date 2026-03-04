import { Component, inject } from "@angular/core";
import { ActivatedRoute, RouterModule } from "@angular/router";

@Component({
	selector: "app-country-detail",
	imports: [RouterModule],
	templateUrl: "./country-detail.html",
	styleUrl: "./country-detail.css",
})
export class CountryDetail {
	private route = inject(ActivatedRoute);
	countryName = this.route.snapshot.paramMap.get("code");

	country = {
		name: {
			common: "Brasil",
			official: "República Federativa do Brasil",
		},
		nativeName: "Brasil",
		flags: {
			svg: "https://flagcdn.com/br.svg",
		},
		population: 203062512,
		region: "América do Sul",
		subregion: "América do Sul",
		capital: "Brasília",
		area: 8515767,
		languages: "Português",
		currencies: "Real (BRL)",
		timezones: "UTC−05:00, UTC−04:00, UTC−03:00",
		borders: [
			{
				name: "Argentina",
				flag: "https://flagcdn.com/w40/ar.png",
			},
			{
				name: "Uruguai",
				flag: "https://flagcdn.com/w40/uy.png",
			},
			{
				name: "Paraguai",
				flag: "https://flagcdn.com/w40/py.png",
			},
		],
	};

	formatPopulation(pop: number): string {
		if (pop >= 1_000_000_000) return `${(pop / 1_000_000_000).toFixed(1)}B`;
		if (pop >= 1_000_000) return `${(pop / 1_000_000).toFixed(1)}M`;
		if (pop >= 1_000) return `${(pop / 1_000).toFixed(1)}K`;
		return pop.toString();
	}
}
