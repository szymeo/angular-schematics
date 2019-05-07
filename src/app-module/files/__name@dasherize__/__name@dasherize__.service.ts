import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { Http, RequestOptionsArgs } from '@angular/http'

@Injectable({
    providedIn: 'root'
})
export class <%= classify(name) %>Service {
    private url: string = '/api/v2/<%= dasherize(name) %>'

    constructor(private http: Http) { }

    public get(): Promise<any> {
        return this.http.get(`${this.url}/`)
    }
}