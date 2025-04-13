import { Component } from "@angular/core";
import { Product } from "../model/product.model";
import { MODES, SharedState, StateUpdate } from "./sharedState.service";
import { MessageService } from "../messages/message.service";
import { Model } from "../model/repository.model";
import { Message } from "../messages/message.model";
import { FormControl, FormGroup, NgForm, Validators } from "@angular/forms";

@Component({
    selector: "paForm",
    templateUrl: "form.component.html",
    styleUrls: ["form.component.css"],
})
export class FormComponent {
    product: Product = new Product();
    editing: boolean = false;

    // nameField: FormControl = new FormControl("", {
    //     validators: [
    //         Validators.required,
    //         Validators.minLength(3),
    //         Validators.pattern("^[A-Za-z ]+$"),
    //     ],
    //     updateOn: "change",
    // });

    // categoryField: FormControl = new FormControl();

    // productForm: FormGroup = new FormGroup({
    //     name: this.nameField,
    //     category: this.categoryField,
    // });
    productForm: FormGroup = new FormGroup({
        name: new FormControl("", {
            validators: [
                Validators.required,
                Validators.minLength(3),
                Validators.pattern("^[A-Za-z ]+$"),
            ],
            updateOn: "change",
        }),
        category: new FormControl(),
    });

    constructor(
        private model: Model,
        private state: SharedState,
        private messageService: MessageService
    ) {
        this.state.changes.subscribe((upd) => this.handleStateChange(upd));
        this.messageService.reportMessage(new Message("Creating New Product"));
    }

    ngOnInit() {
        this.productForm.statusChanges.subscribe((newStatus) => {
            if (newStatus == "INVALID") {
                let invalidControls: string[] = [];
                for (let controlName in this.productForm.controls) {
                    if (this.productForm.controls[controlName].invalid) {
                        invalidControls.push(controlName);
                    }
                }
                this.messageService.reportMessage(
                    new Message(`INVALID: ${invalidControls.join(", ")}`)
                );
            } else {
                this.messageService.reportMessage(new Message(newStatus));
            }
        });

        // this.nameField.statusChanges.subscribe((newStatus) => {
        //     if (newStatus == "INVALID") {
        //         this.categoryField.disable();
        //     } else {
        //         this.categoryField.enable();
        //     }
        // });

        // this.nameField.valueChanges.subscribe((newValue) => {
        //     this.messageService.reportMessage(
        //         new Message(newValue || "(Empty)")
        //     );
        //     if (typeof newValue == "string" && newValue.length % 2 == 0) {
        //         this.nameField.markAsPristine();
        //     }
        // });
    }

    handleStateChange(newState: StateUpdate) {
        this.editing = newState.mode == MODES.EDIT;
        if (this.editing && newState.id) {
            Object.assign(
                this.product,
                this.model.getProduct(newState.id) ?? new Product()
            );
            this.messageService.reportMessage(
                new Message(`Editing ${this.product.name}`)
            );
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
        this.productForm.reset(this.product);
    }

    // submitForm(form: NgForm) {
    //     if (form.valid) {
    //         this.model.saveProduct(this.product);
    //         this.product = new Product();
    //         form.resetForm();
    //     }
    // }
}
