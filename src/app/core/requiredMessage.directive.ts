import {
    Directive,
    ElementRef,
    Input,
    Renderer2,
    TemplateRef,
    ViewContainerRef,
} from "@angular/core";

@Directive({ selector: "[kvRequiredMessage]" })
export class RequiredMessageDirective {
    @Input() messageColor?: "red" | "yellow" = "red";
    constructor(private element: ElementRef, private renderer: Renderer2) {}

    ngOnInit() {
        const span = this.renderer.createElement("span");
        let text: string = "red";

        if (this.messageColor === "red") {
            text = "*required1";
            this.renderer.setStyle(span, "color", "red");
        } else if (this.messageColor === "yellow") {
            text = "*optional1";
            this.renderer.setStyle(span, "color", "yellow");
        }

        // Создаем текстовый узел
        const textNode = this.renderer.createText(text);

        // Добавляем текстовый узел в span
        this.renderer.appendChild(span, textNode);

        // Добавляем span в конец элемента
        this.renderer.appendChild(this.element.nativeElement, span);
    }
}
