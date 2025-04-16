import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'paNotFound',
    template: `<h3 class="bg-danger text-white p-2">Извините, что-то пошло не так</h3>
                <button class="btn btn-primary" routerLink="/">Начать сначала</button> `
})

export class NotFoundComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}