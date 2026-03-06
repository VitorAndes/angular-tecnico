import { Pipe, type PipeTransform } from "@angular/core";

@Pipe({
	name: "formatPopulation",
	standalone: true,
})
export class formatPopulationPipe implements PipeTransform {
	transform(pop: number): string {
		if (pop >= 1_000_000_000) return `${(pop / 1_000_000_000).toFixed(1)}B`;
		if (pop >= 1_000_000) return `${(pop / 1_000_000).toFixed(1)}M`;
		if (pop >= 1_000) return `${(pop / 1_000).toFixed(1)}K`;
		return pop.toString();
	}
}
