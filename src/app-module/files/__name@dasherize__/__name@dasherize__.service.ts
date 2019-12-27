import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class <%= classify(name) %>Service {
    private url: string = '/api/<%= dasherize(name) %>';

    constructor(private http: Http) { }

    public get(): Promise<any> {
        return this.http.get(`${this.url}`);
    }
}