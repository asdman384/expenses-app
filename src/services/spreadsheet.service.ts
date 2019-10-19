import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SheetData } from 'src/model/SheetData';

@Injectable({
    providedIn: 'root'
})
export class SpreadsheetService {

    constructor(private http: HttpClient) { }

    add(token: string, name: string, amount: number, category: string, comment: string): Observable<Response<SheetData[]>> {
        return this.http.jsonp<Response<SheetData[]>>(
            `https://script.google.com/macros/s/${token}/exec?action=add&name=${name}&amount=${amount}&category=${category}&comment=${comment}`, 'callback');
    }

    getCategories(token: string): Observable<Response<string[]>> {
        return this.http.jsonp<Response<string[]>>(
            `https://script.google.com/macros/s/${token}/exec?action=getcategories`, 'callback');
    }

    getMonthData(token: string, user: string, month: number): Observable<Response<SheetData[]>> {
        return this.http.jsonp<Response<SheetData[]>>(
            `https://script.google.com/macros/s/${token}/exec?action=getMonthData&name=${user}&month=${month}`, 'callback');
    }
}

export class Response<TResult> {
    status: string;
    result: TResult;
}
