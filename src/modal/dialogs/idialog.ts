import { EventEmitter } from "@angular/core";

export interface IDialog {
    title: string;
    message: string;
    onAccept: EventEmitter<any>;
    onRefuse: EventEmitter<any>;
}