import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";

const features = [
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
];

@NgModule({
    imports: [features],
    exports: [features],
})
export class MaterialFeatures {}
