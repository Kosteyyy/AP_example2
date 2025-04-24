import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";

const features = [MatButtonModule];

@NgModule({
    imports: [features],
    exports: [features],
})
export class MaterialFeatures {}
