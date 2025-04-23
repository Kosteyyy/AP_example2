import { NgModule } from "@angular/core";

import { OndemandComponent } from "./ondemand.component";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

let routing = RouterModule.forChild([
    { path: "", component: OndemandComponent },
]);

@NgModule({
    imports: [CommonModule, routing],
    exports: [OndemandComponent],
    declarations: [OndemandComponent],
    providers: [],
})
export class OndemandModule {}
