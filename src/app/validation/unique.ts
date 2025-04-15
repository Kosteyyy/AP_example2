import {
    AbstractControl,
    FormArray,
    ValidationErrors,
    ValidatorFn,
} from "@angular/forms";

export class UniqueValidator {
    static unique(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            if (control instanceof FormArray) {
                let badElems = control.controls.filter((child, index) => {
                    return control.controls
                        .filter((c, i2) => i2 != index)
                        .some(
                            (target) =>
                                target.value != "" &&
                                target.value == child.value
                        );
                });
                if (badElems.length > 0) {
                    return { unique: {} };
                }
            }
            return null;
        };
    }
}
