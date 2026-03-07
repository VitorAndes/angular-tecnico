import { Component, EventEmitter, inject, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
	selector: "app-search-and-filter",
	imports: [FormsModule],
	styleUrls: ["./search-and-filter.css"],
	templateUrl: "./search-and-filter.html",
})
export class SearchAndFilter {
	private router = inject(Router);
	private route = inject(ActivatedRoute);

	search = "";
	region = "";

	@Output() filterChange = new EventEmitter<{
		search: string;
		region: string;
	}>();

	ngOnInit() {
		this.route.queryParams.subscribe((params) => {
			this.search = params["search"] || "";
			this.region = params["region"] || "";

			this.emitFilter();
		});
	}

	emitFilter() {
		this.router.navigate([], {
			relativeTo: this.route,
			queryParams: {
				search: this.search || null,
				region: this.region || null,
			},
			queryParamsHandling: "merge",
		});

		this.filterChange.emit({
			search: this.search,
			region: this.region,
		});
	}
}
