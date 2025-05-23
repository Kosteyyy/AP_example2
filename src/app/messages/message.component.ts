import { Component } from "@angular/core";
import { Message } from "./message.model";
import { MessageService } from "./message.service";
import { NavigationCancel, NavigationEnd, Router } from "@angular/router";

@Component({
    selector: "paMessages",
    templateUrl: "message.component.html",
})
export class MessageComponent {
    lastMessage?: Message;

    constructor(messageService: MessageService, router: Router) {
        messageService.messages.subscribe((msg) => (this.lastMessage = msg));
        router.events.subscribe((e) => {
            if (e instanceof NavigationEnd || e instanceof NavigationCancel) {
                this.lastMessage = undefined;
            }
        });
    }
}
