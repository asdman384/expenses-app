import { Component, EventEmitter, OnInit, ElementRef } from '@angular/core';
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

    constructor(private element: ElementRef) { }

    ngOnInit() {
        this.element.nativeElement
            .addEventListener('click', e => this.onAccept.emit());
    }

}
