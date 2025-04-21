import { NgModule } from "@angular/core";

import { Model } from "./repository.model";
import { StaticDataSource } from "./static.datasource";
import { HttpClientModule } from "@angular/common/http"
import { REST_URL, RestDataSource } from "./rest.datasource";
import { ModelResolver } from "./model.resolver";

@NgModule({
    imports: [HttpClientModule],
    exports: [],
    providers: [Model, RestDataSource, {provide: REST_URL, useValue: `http://${location.hostname}:3500/products`}, ModelResolver],
})
export class ModelModule {}
