import { Component, OnInit } from '@angular/core';
import { SpreadsheetService } from 'src/services/spreadsheet.service';
import { StorageService } from 'src/services/interfaces/storage';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    title = 'expenses-app';
    enabled = true;

    token: string = ''
    user: string = ''
    amount: number
    category: string = ''
    comment: string = ''
    categories: string[] = [];

    constructor(
        private service: SpreadsheetService,
        private storage: StorageService) {
    }

    ngOnInit(): void {
        var savedfields = this.storage.get<SavedFields>('savedfields');
        this.categories = this.storage.get<string[]>('categories');

        if (savedfields) {
            this.token = savedfields.token;
            this.user = savedfields.user;
        }
    }

    getCategories() {
        if (!this.token)
            return;

        this.enabled = false;

        this.service
            .getCategories(this.token)
            .subscribe(categories => {
                this.enabled = true;
                this.categories = categories.result;
                this.storage.put<string[]>('categories', categories.result);
            });
    }

    addClick(e) {
        if (!this.user || !this.token || !this.amount || !this.category)
            return;

        this.enabled = false;

        this.service
            .add(this.token, this.user, this.amount, this.category, this.comment)
            .subscribe(respone => {
                this.enabled = true;
                this.storage.put<SavedFields>('savedfields', { token: this.token, user: this.user });
                this.category = '';
                this.comment = '';
                this.amount = null;
            });

    }
}

class SavedFields {
    token: string;
    user: string;
}
