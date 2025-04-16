import { ErrorHandler, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { MessageComponent } from "./message.component";
import { MessageService } from "./message.service";
import { MessageErrorHandler } from "./errorHandler";

@NgModule({
    imports: [BrowserModule],
    declarations: [MessageComponent],
    providers: [MessageService, { provide: ErrorHandler, useClass: MessageErrorHandler }],
    exports: [MessageComponent]
})
export class MessageModule {}