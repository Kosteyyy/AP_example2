import { FormArray } from "@angular/forms";

export type ValueFilter = (value: any) => boolean;

export class FilteredFormArray extends FormArray {
    filter: ValueFilter | undefined = (val) => val == "" || val == null;

    // Используем метод, вызываемый под капотом в FormArray
    _updateValue() {
        (this as { value: any }).value = this.controls
            .filter(
                (control) =>
                    (control.enabled || this.disabled) &&
                    !this.filter?.(control.value)
            )
            .map((control) => control.value);
    }
}
