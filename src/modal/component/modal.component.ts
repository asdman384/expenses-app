import { Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, ElementRef, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { IDialog } from '../dialogs/idialog';
import { ModalDialogData, ModalService } from '../modal.service';

@Component({
    selector: 'modal-component',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit, OnDestroy {

    @ViewChild("messageContainer", { read: ViewContainerRef, static: false })
    private messageContainer: ViewContainerRef;

    private messageComponent: ComponentRef<IDialog>;
    private subscription: Subscription;

    isShow: boolean = false;

    constructor(
        private resolver: ComponentFactoryResolver,
        private service: ModalService) { }

    ngOnInit() {
        this.subscription =
            this.service.showSubject.subscribe(this.openMessage.bind(this));
    }

    private openMessage(data: ModalDialogData) {
        this.isShow = true;
        this.buildMessage(data);
        this.setData(data);
        this.setMessagePosition(data);
    }

    closeMessage() {
        this.isShow = false;
        if (this.messageContainer.length) {
            this.messageComponent.destroy();
            this.messageContainer.clear();
        }
    }

    private setData(data: ModalDialogData): any {
        this.messageComponent.instance.title = data.title;
        this.messageComponent.instance.message = data.message;
        this.messageComponent.instance.onAccept.subscribe(this.closeMessage.bind(this));
        this.messageComponent.instance.onRefuse.subscribe(this.closeMessage.bind(this))

        if (data.onAccept)
            this.messageComponent.instance.onAccept.subscribe(data.onAccept)
        if (data.onRefuse)
            this.messageComponent.instance.onRefuse.subscribe(data.onRefuse)
    }

    private buildMessage(data: ModalDialogData) {
        const factory: ComponentFactory<IDialog> =
            this.resolver.resolveComponentFactory<IDialog>(data.T);
        this.messageContainer.clear();
        this.messageComponent = this.messageContainer.createComponent(factory);
    }

    private setMessagePosition(data: ModalDialogData) {
        var style = this.messageComponent.location.nativeElement.style;

        style.display = 'block';
        style.position = 'absolute';
        style.left = `${data.x ? data.x - 20 + 'px' : 0}`;
        style.padding = `${data.x ? 0 : 16}px`;
        style['max-height'] = '70%';
        style.margin = 'auto';
        style['z-index'] = '9999';

        setTimeout(() => {
            style.top = `${data.y ? data.y + 10 - this.messageComponent.location.nativeElement.scrollHeight + window.scrollY + 'px' : 20 + '%'}`;
        }, 1);
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

}
