import { Injectable } from "@angular/core";
import { MessageService } from "./messages/message.service";
import {
    ActivatedRouteSnapshot,
    Router,
    RouterStateSnapshot,
} from "@angular/router";
import { Message } from "./messages/message.model";

@Injectable()
export class TermsGuard {
    constructor(private messages: MessageService, private router: Router) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Promise<boolean> | boolean {
        if (route.params["mode"] == "create") {
            return new Promise<boolean>((resolve) => {
                let responses: [string, () => void][] = [
                    ["Да", () => resolve(true)],
                    ["Нет", () => resolve(false)],
                ];
                this.messages.reportMessage(
                    new Message(
                        "Вы принимаете соглашение об условиях? ",
                        false,
                        responses
                    )
                );
            });
        } else {
            return true;
        }
    }

    canActivateChild(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Promise<boolean> | boolean {
        if (
            route.url.length > 0 &&
            route.url[route.url.length - 1].path == "categories"
        ) {
            return new Promise<boolean>((resolve, reject) => {
                let responses: [string, (arg: string) => void][] = [
                    ["Да", () => resolve(true)],
                    ["Нет ", () => resolve(false)],
                ];
                this.messages.reportMessage(
                    new Message(
                        "Хотите увидеть категоии?",
                        false,
                        responses
                    )
                );
            });
        } else {
            return true;
        }
    }
}
