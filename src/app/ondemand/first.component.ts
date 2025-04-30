import {
    Component,
    EventEmitter,
    HostListener,
    OnInit,
    Output,
} from "@angular/core";
import { Model } from "../model/repository.model";
import { Product } from "../model/product.model";

@Component({
    selector: "first",
    templateUrl: "first.component.html",
})
export class FirstComponent implements OnInit {
    constructor(private repository: Model) {}

    category: string = "Soccer";
    highlighted: boolean = false;

    @Output("pa-highlight")
    change = new EventEmitter<boolean>();

    ngOnInit() {}

    getProducts(): Product[] {
        return this.repository
            .getProducts()
            .filter((p) => p.category == this.category);
    }

    @HostListener("mouseenter", ["$event.type"])
    @HostListener("mouseleave", ["$event.type"])
    setHighlight(type: string) {
        this.highlighted = type == "mouseenter";
        this.change.emit(this.highlighted);
    }
}
