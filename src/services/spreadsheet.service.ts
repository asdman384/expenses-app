import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SpreadsheetService {

    constructor(private http: HttpClient) { }

    add(token: string, name: string, amount: number, category: string): Observable<AddResponse> {
        return this.http.jsonp<AddResponse>(
            `https://script.google.com/macros/s/${token}/exec?name=${name}&amount=${amount}&category=${category}`, 'callback');
    }

}

export class AddResponse {
    status: string;
}