import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, of } from "rxjs";
import { map, shareReplay, switchMap } from "rxjs/operators";
import { IBorderCountry, ICountry } from "../models/countries.model";

@Injectable({
	providedIn: "root",
})
export class CountryService {
	private BASE_URL = "https://restcountries.com/v3.1";
	private http = inject(HttpClient);

	private countries$?: Observable<ICountry[]>;

	private countryCache = new Map<
		string,
		Observable<{ countryData: ICountry; borders: IBorderCountry[] }>
	>();

	getAllCountries(): Observable<ICountry[]> {
		if (!this.countries$) {
			this.countries$ = this.http
				.get<ICountry[]>(
					`${this.BASE_URL}/all?fields=cca3,name,flags,population,region,capital`,
				)
				.pipe(shareReplay(1));
		}

		return this.countries$;
	}

	getCountryDetail(
		code: string,
	): Observable<{ countryData: ICountry; borders: IBorderCountry[] }> {
		if (this.countryCache.has(code)) {
			return this.countryCache.get(code)!;
		}

		const request$ = this.http
			.get<ICountry>(
				`${this.BASE_URL}/alpha/${code}?fields=cca3,name,flags,population,region,subregion,capital,area,languages,currencies,timezones,borders,maps`,
			)
			.pipe(
				switchMap((countryData) => {
					const borders$ = countryData?.borders?.length
						? this.http.get<IBorderCountry[]>(
								`${this.BASE_URL}/alpha?codes=${countryData.borders.join(
									",",
								)}&fields=cca3,name,flags`,
							)
						: of([]);

					return borders$.pipe(
						map((borders) => ({
							countryData,
							borders,
						})),
					);
				}),
				shareReplay(1),
			);

		this.countryCache.set(code, request$);

		return request$;
	}
}
