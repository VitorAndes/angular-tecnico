export interface ICountry {
	cca3: string;
	name: {
		common: string;
		official: string;
		nativeName?: { eng: { official: string } };
	};
	flags: { svg: string; png: string; alt?: string };
	population: number;
	region: string;
	subregion?: string;
	capital?: string[];
	area?: number;
	languages?: Record<string, string>;
	currencies?: Record<string, { name: string; symbol?: string }>;
	timezones?: string[];
	borders?: string[];
	maps?: { googleMaps?: string; openStreetMaps?: string };
}

export interface IBorderCountry {
	cca3: string;
	name: {
		common: string;
	};
	flags: {
		svg: string;
		png: string;
		alt: string;
	};
}
