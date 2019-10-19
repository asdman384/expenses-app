import { AfterViewInit, Component, OnInit } from '@angular/core';
import { of } from 'rxjs/internal/observable/of';
import { catchError } from 'rxjs/operators';
import { ModalService } from 'src/modal/modal.service';
import { SheetData } from 'src/model/SheetData';
import { StorageService } from 'src/services/interfaces/storage';
import { Response, SpreadsheetService } from 'src/services/spreadsheet.service';
import { MessageBoxComponent } from 'src/modal/dialogs/message-box/message-box.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
    ngAfterViewInit(): void {
    }

    isLoading = false;

    token: string = ''

    user: string = ''
    amount: number
    category: string = ''
    comment: string = ''

    categories: string[] = [];
    lastRows: SheetData[];
    monthData: SheetData[];

    constructor(
        private modalService: ModalService,
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
        this.monthData = null;
        this.isLoading = true;
        this.service
            .add(this.token, this.user, this.amount, this.category, this.comment)
            .pipe(catchError(error => this.handleError<SheetData[]>(error)))
            .subscribe(response => {
                this.lastRows = response.result;
                this.isLoading = false;
                this.storage.put<SavedFields>('savedfields', { token: this.token, user: this.user });
                this.category = '';
                this.comment = '';
                this.amount = null;
            });
    }

    getMonthData(month: number) {

        this.isLoading = true;
        this.service
            .getMonthData(this.token, this.user, month - 1)
            .pipe(catchError(error => this.handleError<SheetData[]>(error)))
            .subscribe(response => {
                this.monthData = response.result.length == 1 ? null : response.result.slice(1);
                this.lastRows = null;
                this.isLoading = false;
            });
    }

    handleError<TResult>(error) {
        this.modalService.show({ T: MessageBoxComponent, title: `Error`, message: error.message });
        return of(new Response<TResult>());
    }
}

class SavedFields {
    token: string;
    user: string;
}
