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
    sendEnabled = true;

    token: string = ''
    user: string = ''
    amount: number
    category: string = ''

    constructor(
        private service: SpreadsheetService,
        private storage: StorageService) {
    }

    ngOnInit(): void {
        var savedfields = this.storage.get<SavedFields>('savedfields');
        console.log(savedfields);

        if (savedfields) {
            this.token = savedfields.token;
            this.user = savedfields.user;
        }
    }

    sendClick(e) {

        if (!this.user || !this.token || !this.amount || !this.category)
            return;

        this.sendEnabled = false;

        console.log(this.token, this.user, this.amount, this.category);

        this.service
            .add(this.token, this.user, this.amount, this.category)
            .subscribe(respone => {
                this.sendEnabled = true;
                this.storage.put<SavedFields>('savedfields', { token: this.token, user: this.user });
                console.log(respone);
            });

    }
}

class SavedFields {
    token: string;
    user: string;
}
