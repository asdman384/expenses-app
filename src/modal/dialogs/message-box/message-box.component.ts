import { Component, EventEmitter, OnInit } from '@angular/core';
import { IDialog } from '../idialog';

@Component({
    selector: 'message-box',
    templateUrl: './message-box.component.html',
    styleUrls: ['./message-box.component.css']
})
export class MessageBoxComponent implements OnInit, IDialog {

    onAccept: EventEmitter<any> = new EventEmitter();
    onRefuse: EventEmitter<any> = new EventEmitter();

    public title: string;
    public message: string;

    constructor() { }

    ngOnInit() {
    }

}
