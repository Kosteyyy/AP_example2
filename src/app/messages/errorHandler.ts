import { ErrorHandler, Injectable, NgZone } from "@angular/core";
import { MessageService } from "./message.service";
import { Message } from "./message.model";

@Injectable()
export class MessageErrorHandler implements ErrorHandler {
    constructor(
        private messageService: MessageService,
        private ngZone: NgZone
    ) {}
    handleError(error: any): void {
        let mgs = error instanceof Error ? error.message : error.toString();
        // Для триггера детекции изменений
        this.ngZone.run(
            () => this.messageService.reportMessage(new Message(mgs, true)),
            0
        );
    }
}
