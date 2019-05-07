import { Component, OnInit } from '@angular/core';

@Component({
    templateUrl: './<%= dasherize(name) %>.page.html',
    styleUrls: ['./<%= dasherize(name) %>.page.<%= style %>']
})
export class <%= classify(name) %>Page implements OnInit {

    constructor() { }

    ngOnInit() {
    }

}
