import { Routes } from "@angular/router";
import { CountryDetail } from "./components/country-detail/country-detail";
import { Home } from "./components/home/home";

export const routes: Routes = [
	{ path: "", component: Home },
	{ path: "country/:code", component: CountryDetail },
];
