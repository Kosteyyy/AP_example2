import { Pipe, PipeTransform } from "@angular/core";
import { FormControl, ValidationErrors } from "@angular/forms";

@Pipe({
    name: "validationFormat",
})
export class ValidationHelper implements PipeTransform {
    transform(source: any, name: any): any {
        if (source instanceof FormControl) {
            return this.formatMessages((source as FormControl).errors, name);
        }
        return this.formatMessages(source as ValidationErrors, name);
    }

    formatMessages(errors: ValidationErrors | null, name: string): string[] {
        let messages: string[] = [];
        for (let errorName in errors) {
            switch (errorName) {
                case "required":
                    messages.push(`Вы должны ввести ${name}`);
                    break;
                case "minlength":
                    messages.push(
                        `${name} должно содержать как минимум ${errors["minlength"].requiredLength} символов`
                    );
                    break;
                case "pattern":
                    messages.push(`${name} содержит недопустимые символы`);
                    break;
                case "limit":
                    messages.push(
                        `Значение ${name} не должно превышать ${errors["limit"].limit}`
                    );
                    break;
                case "hilow":
                    messages.push(
                        `Значение ${name} должно быть между ${errors["hilow"].low} и ${errors["hilow"].high}`
                    );
                    break;
                case "unique":
                    messages.push(`Поле ${name} должно быть уникальным`);
                    break;
                case "prohibited":
                    messages.push(
                        `Поле ${name} не может содержать "${errors["prohibited"].prohibited}"`
                    );
                    break;
            }
        }
        return messages;
    }
}
