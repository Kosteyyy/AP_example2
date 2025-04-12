import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { ModelModule } from "./model/model.module";
import { CoreModule } from "./core/core.module";
import { MessageModule } from "./messages/message.modlule";
import { TableComponent } from "./core/table.component";
import { FormComponent } from "./core/form.component";
import { MessageComponent } from "./messages/message.component";

// import { AppComponent } from './app.component';

@NgModule({
    declarations: [],
    imports: [BrowserModule, ModelModule, CoreModule, MessageModule],
    providers: [],
    bootstrap: [TableComponent, FormComponent, MessageComponent],
})
export class AppModule {}
