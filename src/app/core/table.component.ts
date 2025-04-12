import { Component } from "@angular/core";
import { Model } from "../model/repository.model";
import { MODES, SharedState } from "./sharedState.service";
import { Product } from "../model/product.model";

@Component({
    selector: "paTable",
    templateUrl: "table.component.html",
})
export class TableComponent {
    constructor(private model: Model, private state: SharedState) {}

    getProduct(key: number): Product | undefined {
        return this.model.getProduct(key);
    }

    getProducts(): Product[] {
        return this.model.getProducts();
    }

    deleteProduct(key?: number) {
        if (key != undefined) {
            this.model.deleteProduct(key);
        }
    }

    editProduct(key?: number) {
        this.state.update(MODES.EDIT, key);
    }

    createProduct() {
        this.state.update(MODES.CREATE);
    }
}
