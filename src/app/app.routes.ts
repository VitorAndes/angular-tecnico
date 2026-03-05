import type { Routes } from "@angular/router";
export const routes: Routes = [
	{
		path: "",
		loadChildren: () =>
			import("./features/countries/countries.routes").then(
				(r) => r.COUNTRIES_ROUTES,
			),
	},
];
