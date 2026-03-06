import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
	selector: "app-error-api",
	imports: [],
	templateUrl: "./error-api.html",
	styleUrl: "./error-api.css",
})
export class ErrorApi {
	@Input() message?: string;
	@Output() reload = new EventEmitter<void>();
}
