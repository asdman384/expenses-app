import { registerLocaleData } from '@angular/common';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import localeUk from '@angular/common/locales/uk';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ModalComponent } from 'src/modal/component/modal.component';
import { BalloonComponent } from 'src/modal/dialogs/balloon/balloon.component';
import { MessageBoxComponent } from 'src/modal/dialogs/message-box/message-box.component';
import { ModalService } from 'src/modal/modal.service';
import { StorageService } from 'src/services/interfaces/storage';
import { LocalStorageService } from 'src/services/localstorage.service';
import { SpreadsheetService } from 'src/services/spreadsheet.service';
import { AppComponent } from './app.component';
import { ChartComponent } from './chart/chart.component';
registerLocaleData(localeUk);

@NgModule({
    declarations: [
        BalloonComponent,
        MessageBoxComponent,
        ModalComponent,
        AppComponent,
        ChartComponent
    ],
    imports: [
        FormsModule,
        BrowserModule,
        HttpClientModule,
        HttpClientJsonpModule
    ],
    entryComponents: [
        MessageBoxComponent,
        BalloonComponent
    ],
    providers: [
        ModalService,
        { provide: LOCALE_ID, useValue: 'uk' },
        SpreadsheetService,
        { provide: StorageService, useClass: LocalStorageService }, LocalStorageService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }