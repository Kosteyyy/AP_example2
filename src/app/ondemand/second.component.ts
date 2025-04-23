import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'second',
    template: `<div class="bg-info text-white p-2">Second Component</div>`
})

export class SecondComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}