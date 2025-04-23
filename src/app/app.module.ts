import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { ModelModule } from "./model/model.module";
import { CoreModule } from "./core/core.module";
import { MessageModule } from "./messages/message.modlule";
import { routing } from "./app.routing";
import { AppComponent } from "./app.component";
import { TermsGuard } from "./terms.guard";
import { LoadGuard } from "./load.guard";

// import { AppComponent } from './app.component';

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, ModelModule, CoreModule, MessageModule, routing],
    providers: [TermsGuard, LoadGuard],
    bootstrap: [AppComponent],
})
export class AppModule {}
