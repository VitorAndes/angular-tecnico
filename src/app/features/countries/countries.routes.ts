import type { Routes } from "@angular/router";
import { CountryDetail } from "./pages/country-detail/country-detail";
import { Home } from "./pages/home/home";

export const COUNTRIES_ROUTES: Routes = [
	{ path: "", component: Home },
	{ path: "country/:code", component: CountryDetail },
];
