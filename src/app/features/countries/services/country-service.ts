import { Injectable } from "@angular/core";
import type { IBorderCountry, ICountry } from "../models/countries.model";

@Injectable({
	providedIn: "root",
})
export class CountryService {
	private BASE_URL = "https://restcountries.com/v3.1";

	async getAllCountries() {
		const response = await fetch(
			`${this.BASE_URL}/all?fields=cca3,name,flags,population,region,capital`,
		);

		if (!response.ok) {
			throw new Error("Erro ao carregar os países, por favor tente novamente.");
		}

		const data = await response.json();

		return data;
	}

	async getCountryDetail(
		code: string,
	): Promise<{ countryData: ICountry; borders: IBorderCountry[] }> {
		const response = await fetch(
			`${this.BASE_URL}/alpha/${code}?fields=cca3,name,flags,population,region,subregion,capital,area,languages,currencies,timezones,borders,maps`,
		);

		if (!response.ok) {
			throw new Error(
				"Erro ao carregar os detalhes do país, por favor tente novamente.",
			);
		}

		const countryData: ICountry = await response.json();

		let borders: IBorderCountry[] = [];

		if (countryData?.borders?.length) {
			const bordersResponse = await fetch(
				`${this.BASE_URL}/alpha?codes=${countryData.borders.join(",")}&fields=cca3,name,flags`,
			);

			borders = await bordersResponse.json();
		}

		return { countryData, borders };
	}
}
