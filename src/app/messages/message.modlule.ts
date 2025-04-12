import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { MessageComponent } from "./message.component";
import { MessageService } from "./message.service";

@NgModule({
    imports: [BrowserModule],
    declarations: [MessageComponent],
    providers: [MessageService],
    exports: [MessageComponent]
})
export class MessageModule {}