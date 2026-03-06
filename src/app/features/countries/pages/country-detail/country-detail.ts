import { KeyValuePipe } from "@angular/common";
import { Component, inject, resource } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { map } from "rxjs";
import { DetailSkeleton } from "../../../../shared/components/detail-skeleton/detail-skeleton";
import { ErrorApi } from "../../../../shared/components/error-api/error-api";
import { formatPopulationPipe } from "../../../../shared/utils/format-population";
import { CountryService } from "../../services/country-service";

@Component({
	selector: "app-country-detail",
	imports: [
		RouterModule,
		KeyValuePipe,
		DetailSkeleton,
		formatPopulationPipe,
		ErrorApi,
	],
	templateUrl: "./country-detail.html",
	styleUrl: "./country-detail.css",
})
export class CountryDetail {
	private route = inject(ActivatedRoute);
	private countryService = inject(CountryService);

	countryCode = toSignal(
		this.route.paramMap.pipe(map((params) => params.get("code"))),
	);

	ref = resource({
		params: () => this.countryCode(),

		loader: async ({ params }) => {
			if (!params) return null;
			return this.countryService.getCountryDetail(params);
		},
	});
}
