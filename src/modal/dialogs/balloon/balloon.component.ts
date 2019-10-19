import { Component, EventEmitter, OnInit } from '@angular/core';
import { IDialog } from '../idialog';

@Component({
    selector: 'balloon-box',
    templateUrl: './balloon.component.html',
    styleUrls: ['./balloon.component.css']
})
export class BalloonComponent implements OnInit, IDialog {

    onAccept: EventEmitter<any> = new EventEmitter();
    onRefuse: EventEmitter<any> = new EventEmitter();

    public title: string;
    public message: string;

    constructor() { }

    ngOnInit() {
    }

}
