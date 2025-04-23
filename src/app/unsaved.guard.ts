import { Injectable } from "@angular/core";
import { MessageService } from "./messages/message.service";
import {
    ActivatedRouteSnapshot,
    Router,
    RouterStateSnapshot,
} from "@angular/router";
import { FormComponent } from "./core/form.component";
import { Observable, Subject } from "rxjs";
import { Message } from "./messages/message.model";

@Injectable()
export class UnsavedGuard {
    constructor(private messages: MessageService, private router: Router) {}

    canDeactivate(
        component: FormComponent,
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | boolean {
        if (component.editing && component.unsavedChanges()) {
            let subject = new Subject<boolean>();
            let responses: [string, (r: string) => void][] = [
                [
                    "Да",
                    () => {
                        subject.next(true);
                        subject.complete();
                    },
                ],
                [
                    "Нет",
                    () => {
                        this.router.navigateByUrl(this.router.url);
                        subject.next(false);
                        subject.complete();
                    },
                ],
            ];
            this.messages.reportMessage(
                new Message("Отменить изменения?", true, responses)
            );
            return subject;
        }
        return true;
    }
}
