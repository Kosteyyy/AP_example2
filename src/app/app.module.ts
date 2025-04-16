import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { ModelModule } from "./model/model.module";
import { CoreModule } from "./core/core.module";
import { MessageModule } from "./messages/message.modlule";
import { routing } from "./app.routing";
import { AppComponent } from "./app.component";

// import { AppComponent } from './app.component';

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, ModelModule, CoreModule, MessageModule, routing],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
