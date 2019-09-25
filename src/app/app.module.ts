import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { StorageService } from 'src/services/interfaces/storage';
import { LocalStorageService } from 'src/services/localstorage.service';
import { SpreadsheetService } from 'src/services/spreadsheet.service';
import { AppComponent } from './app.component';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        FormsModule,
        BrowserModule,
        HttpClientModule,
        HttpClientJsonpModule
    ],
    providers: [
        SpreadsheetService,
        { provide: StorageService, useClass: LocalStorageService }, LocalStorageService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }