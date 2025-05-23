import { AbstractControl, FormArray } from "@angular/forms";

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


    // Чтобы валидация сохранялась корректно при добавлении и удалении элементов массива. Но вроде и без этого работает.
    override push(
        control: AbstractControl,
        options?: { emitEvent?: boolean | undefined }
    ): void {
        super.push(control, options);
        this.controls.forEach((c) => c.updateValueAndValidity());
    }

    override removeAt(
        index: number,
        options?: { emitEvent?: boolean | undefined }
    ): void {
        super.removeAt(index, options);
        this.controls.forEach((c) => c.updateValueAndValidity());
    }
}
