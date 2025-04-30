import { Component, ViewChild } from "@angular/core";
import { PaAttrDirective } from "../ondemand/attr.directive";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";

@Component({
    template: `<div><span [pa-attr]="className">Test Content</span></div>`,
})
class TestComponent {
    className = "initialClass";
    @ViewChild(PaAttrDirective)
    attrDirective!: PaAttrDirective;
}

describe("PaAttrDirective", () => {
    let fixture: ComponentFixture<TestComponent>;
    let directive: PaAttrDirective;
    let spanElement: HTMLSpanElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TestComponent, PaAttrDirective],
        });
        fixture = TestBed.createComponent(TestComponent);
        fixture.detectChanges();
        directive = fixture.componentInstance.attrDirective;
        spanElement = fixture.debugElement.query(By.css("span")).nativeElement;
    });

    it("Генерирует корректное число элементов ", () => {
        fixture.detectChanges();
        expect(directive.bgClass).toBe("initialClass");
        expect(spanElement.className).toBe("initialClass");

        fixture.componentInstance.className = "nextClass";
        fixture.detectChanges();
        expect(directive.bgClass).toBe("nextClass");
        expect(spanElement.className).toBe("nextClass");
    });
});
