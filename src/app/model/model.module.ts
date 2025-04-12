import { NgModule } from "@angular/core";

import { Model } from "./repository.model";
import { StaticDataSource } from "./static.datasource";

@NgModule({
    imports: [],
    exports: [],
    providers: [Model, StaticDataSource],
})
export class ModelModule {}
