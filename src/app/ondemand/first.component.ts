import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'first',
    template: `<div class="bg-primary text-white p-2">First Component</div>`
})

export class FirstComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}