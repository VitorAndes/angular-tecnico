import { Component, EventEmitter, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";

@Component({
	selector: "app-search-and-filter",
	imports: [FormsModule],
	templateUrl: "./search-and-filter.html",
	styleUrl: "./search-and-filter.css",
})
export class SearchAndFilter {
	search = "";
	region = "";

	@Output() filterChange = new EventEmitter<{
		search: string;
		region: string;
	}>();

	emitFilter() {
		this.filterChange.emit({
			search: this.search,
			region: this.region,
		});
	}
}
