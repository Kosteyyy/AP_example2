import { RouterModule, Routes } from "@angular/router";
import { FormComponent } from "./core/form.component";
import { TableComponent } from "./core/table.component";
import { NotFoundComponent } from "./core/notFound.component";
import { UnsavedGuard } from "./unsaved.guard";

const routes: Routes = [
    {
        path: "ondemand",
        loadChildren: () =>
            import("./ondemand/ondemand.module").then((m) => m.OndemandModule),
    },
    { path: "", redirectTo: "/ondemand", pathMatch: "full" },
];

// const routes: Routes = [
//     {
//         path: "form/:mode/:id",
//         component: FormComponent,
//         canDeactivate: [UnsavedGuard],
//     },
//     { path: "form/:mode", component: FormComponent },
//     { path: "table", component: TableComponent },
//     { path: "table/:category", component: TableComponent },
//     { path: "", redirectTo: "/table", pathMatch: "full" },
//     { path: "**", component: NotFoundComponent },
// ];

export const routing = RouterModule.forRoot(routes);
