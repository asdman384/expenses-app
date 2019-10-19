import { Injectable, Type } from '@angular/core';
import { Subject } from 'rxjs';
import { IDialog } from './dialogs/idialog';

@Injectable({ providedIn: 'root' })
export class ModalService {
    private show$: Subject<ModalDialogData> = new Subject<ModalDialogData>();

    get showSubject(): Subject<ModalDialogData> { return this.show$; }

    constructor() { }

    show(data: ModalDialogData) {
        this.show$.next(data)
    }
}

export class ModalDialogData {
    T: Type<IDialog>;
    title: string;
    message: string;
    x?: number;
    y?: number;
    onAccept?: (_: any) => any;
    onRefuse?: (_: any) => any;
}
