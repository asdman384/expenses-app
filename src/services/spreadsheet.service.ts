import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SpreadsheetService {

    constructor(private http: HttpClient) { }

    add(token: string, name: string, amount: number, category: string, comment: string): Observable<Response<string>> {
        return this.http.jsonp<Response<string>>(
            `https://script.google.com/macros/s/${token}/exec?action=add&name=${name}&amount=${amount}&category=${category}&comment=${comment}`, 'callback');
    }

    getCategories(token: string): Observable<Response<string[]>> {
        return this.http.jsonp<Response<string[]>>(
            `https://script.google.com/macros/s/${token}/exec?action=getcategories`, 'callback');
    }

}

export class Response<TResponse> {
    status: string;
    result: TResponse;
}
