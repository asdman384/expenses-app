import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { StorageService } from 'src/services/interfaces/storage';
import { SpreadsheetService, Response } from 'src/services/spreadsheet.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    @ViewChild('errordialog', { static: false }) errorDialog: ElementRef

    title = 'Expenses app';
    isLoading = false;

    token: string = ''
    user: string = ''
    amount: number
    category: string = ''
    comment: string = ''
    categories: string[] = [];
    errorMessage: string;

    constructor(
        private service: SpreadsheetService,
        private storage: StorageService) {
    }

    ngOnInit(): void {
        this.categories = this.storage.get<string[]>('categories');
        var savedfields = this.storage.get<SavedFields>('savedfields');
        if (savedfields) {
            this.token = savedfields.token;
            this.user = savedfields.user;
        }
    }

    getCategories() {
        this.isLoading = true;
        this.service
            .getCategories(this.token)
            .pipe(catchError(error => this.handleError<string[]>(error)))
            .subscribe(categories => {
                this.isLoading = false;
                this.categories = categories.result;
                this.storage.put<string[]>('categories', categories.result);
            });
    }

    addClick() {
        this.isLoading = true;
        this.service
            .add(this.token, this.user, this.amount, this.category, this.comment)
            .pipe(catchError(error => this.handleError<string>(error)))
            .subscribe(respone => {
                this.isLoading = false;
                this.storage.put<SavedFields>('savedfields', { token: this.token, user: this.user });
                this.category = '';
                this.comment = '';
                this.amount = null;
            });
    }

    handleError<TResult>(error) {
        this.errorMessage = error.message;
        this.errorDialog.nativeElement.showModal();
        return of(new Response<TResult>());
    }
}

class SavedFields {
    token: string;
    user: string;
}
