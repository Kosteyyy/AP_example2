import { Component } from "@angular/core";
import { Product } from "../model/product.model";
import { MODES, SharedState, StateUpdate } from "./sharedState.service";
import { MessageService } from "../messages/message.service";
import { Model } from "../model/repository.model";
import { Message } from "../messages/message.model";
import {
    FormArray,
    FormControl,
    FormGroup,
    NgForm,
    Validators,
} from "@angular/forms";
import { FilteredFormArray } from "./filteredFormArray";
import { LimitValidator } from "../validation/limit";
import { UniqueValidator } from "../validation/unique";

@Component({
    selector: "paForm",
    templateUrl: "form.component.html",
    styleUrls: ["form.component.css"],
})
export class FormComponent {
    product: Product = new Product();
    editing: boolean = false;

    keywordGroup = new FilteredFormArray([this.createKeywordFormControl()], {
        validators: UniqueValidator.unique(),
    });

    productForm: FormGroup = new FormGroup({
        name: new FormControl("", {
            validators: [
                Validators.required,
                Validators.minLength(3),
                Validators.pattern("^[A-Za-z ]+$"),
            ],
            updateOn: "change",
        }),
        category: new FormControl("", { validators: Validators.required }),
        price: new FormControl("", {
            validators: [
                Validators.required,
                Validators.pattern("^[0-9.]+$"),
                LimitValidator.Limit(300),
            ],
        }),
        details: new FormGroup({
            supplier: new FormControl("", { validators: Validators.required }),
            keywords: this.keywordGroup,
        }),
    });

    constructor(
        private model: Model,
        private state: SharedState,
        private messageService: MessageService
    ) {
        this.state.changes.subscribe((upd) => this.handleStateChange(upd));
        this.messageService.reportMessage(new Message("Creating New Product"));
    }

    handleStateChange(newState: StateUpdate) {
        this.editing = newState.mode == MODES.EDIT;
        this.keywordGroup.clear();
        if (this.editing && newState.id) {
            Object.assign(
                this.product,
                this.model.getProduct(newState.id) ?? new Product()
            );
            this.messageService.reportMessage(
                new Message(`Editing ${this.product.name}`)
            );
            this.product.details?.keywords?.forEach((val) => {
                this.keywordGroup.push(this.createKeywordFormControl());
            });
            // this.nameField.setValue(this.product.name);
            // this.categoryField.setValue(this.product.category);
        } else {
            this.product = new Product();
            this.messageService.reportMessage(
                new Message("Creating New Product")
            );
            // this.nameField.setValue("");
            // this.categoryField.setValue("");
        }
        if (this.keywordGroup.length == 0) {
            this.keywordGroup.push(this.createKeywordFormControl());
        }
        this.productForm.reset(this.product);
    }

    submitForm() {
        if (this.productForm.valid) {
            Object.assign(this.product, this.productForm.value);
            this.model.saveProduct(this.product);
            this.product = new Product();
            this.keywordGroup.clear();
            this.keywordGroup.push(this.createKeywordFormControl());
            this.productForm.reset();
        }
    }
    resetForm() {
        this.keywordGroup.clear();
        this.keywordGroup.push(this.createKeywordFormControl());
        this.editing = true;
        this.product = new Product();
        this.productForm.reset();
    }

    // submitForm(form: NgForm) {
    //     if (form.valid) {
    //         this.model.saveProduct(this.product);
    //         this.product = new Product();
    //         form.resetForm();
    //     }
    // }

    createKeywordFormControl() {
        return new FormControl("", {
            validators: Validators.pattern("^[A-Za-z ]+$"),
        });
    }

    addKeywordControl() {
        this.keywordGroup.push(this.createKeywordFormControl());
    }

    removeKeywordControl(index: number) {
        this.keywordGroup.removeAt(index);
    }
}
