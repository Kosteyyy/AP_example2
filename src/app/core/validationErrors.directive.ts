import { Directive, Input, TemplateRef, ViewContainerRef } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ValidationHelper } from "./validation_helpers";
import { distinctUntilChanged } from "rxjs";

@Directive({ selector: "[validationErrors]" })
export class ValidationErrorsDirective {
    constructor(
        private container: ViewContainerRef,
        private template: TemplateRef<Object>
    ) {}

    @Input("validationErrorsControl")
    name: string = "";

    @Input("validationErrorsLabel")
    label?: string; // Для вложенных контролов мы не можем использовать control, либо можем изменить имя.

    @Input("validationErrors")
    formGroup?: FormGroup;

    ngOnInit() {
        let formatter = new ValidationHelper();
        if (this.formGroup && this.name) {
            let control = this.formGroup?.get(this.name);
            if (control) {
                control.statusChanges.subscribe((newStatus) => {
                    if (this.container.length > 0) {
                        this.container.clear();
                    }
                    if (
                        control &&
                        control.dirty &&
                        control.invalid &&
                        control.errors
                    ) {
                        formatter
                            .formatMessages(
                                control.errors,
                                this.label ?? this.name
                            )
                            .forEach((err) => {
                                this.container.createEmbeddedView(
                                    this.template,
                                    { $implicit: err }
                                );
                            });
                    }
                });
            }
        }
    }
}
