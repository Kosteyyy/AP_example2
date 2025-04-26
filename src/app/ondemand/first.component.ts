import { Component, OnInit } from "@angular/core";
import { Model } from "../model/repository.model";
import { Product } from "../model/product.model";

@Component({
    selector: "first",
    template: `<div class="bg-primary p-a-1">
        There are
        <span class="strong"> {{ getProducts().length }} </span>
        products
    </div>`,
})
export class FirstComponent implements OnInit {
    constructor(private repository: Model) {}

    category: string = "Soccer";

    ngOnInit() {}

    getProducts(): Product[] {
        return this.repository
            .getProducts()
            .filter((p) => p.category == this.category);
    }
}
