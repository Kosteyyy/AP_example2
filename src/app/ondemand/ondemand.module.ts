import { NgModule } from "@angular/core";

import { OndemandComponent } from "./ondemand.component";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FirstComponent } from "./first.component";
import { SecondComponent } from "./second.component";
import { PaAttrDirective } from "./attr.directive";

let routing = RouterModule.forChild([
    {
        path: "",
        component: OndemandComponent,
        children: [
            { outlet: "primary", path: "", component: FirstComponent },
            { outlet: "left", path: "", component: SecondComponent },
            { outlet: "right", path: "", component: SecondComponent },
        ],
    },
    {
        path: "swap",
        component: OndemandComponent,
        children: [
            { outlet: "primary", path: "", component: SecondComponent },
            { outlet: "left", path: "", component: FirstComponent },
            { outlet: "right", path: "", component: FirstComponent },
        ],
    },
]);

@NgModule({
    imports: [CommonModule, routing],
    exports: [OndemandComponent],
    declarations: [OndemandComponent, FirstComponent, SecondComponent, PaAttrDirective],
    providers: [],
})
export class OndemandModule {}
