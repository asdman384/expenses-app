import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChange } from '@angular/core';
import { BalloonComponent } from 'src/modal/dialogs/balloon/balloon.component';
import { ModalService } from 'src/modal/modal.service';
import { SheetData } from 'src/model/SheetData';

@Component({
    selector: 'app-chart',
    templateUrl: './chart.component.html',
    styleUrls: ['./chart.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartComponent implements OnInit, OnChanges {
    datePipe: DatePipe;

    constructor(
        private modalService: ModalService
    ) {
        this.datePipe = new DatePipe('uk');
    }

    @Input() dataSet: SheetData[]; //[["Date", "Amount", "Category", "Description"]]
    reducedData: ResucedData;

    ngOnInit() {
    }

    ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
        this.reducedData = this.reduceByCategory(changes.dataSet.currentValue);
    }

    barClick(cat: string, comment: string, e) {
        if (typeof (comment) === 'string') {
            if (comment)
                this.modalService.show({ T: BalloonComponent, title: ``, message: comment, x: e.clientX, y: e.clientY });
            return;
        }

        var summ: number = 0;
        var data: CategoryAmount[] =
            this.dataSet.reduce((p, [date, amount, category, comment]) => {
                if (category === cat) {
                    p.push(new CategoryAmount(this.datePipe.transform(date, 'd.MM.yyyy'), amount, comment));
                    summ += amount;
                }
                return p;
            }, [])

        this.reducedData = {
            data: Object.values(data).sort((a, b) => b.amount - a.amount),
            summ,
            category: cat
        }
    }

    reduceByCategory(dataSet: SheetData[]): ResucedData {
        var summ: number = 0;

        if (!dataSet)
            return { data: [], summ };

        var data: { [propKey: string]: CategoryAmount } = dataSet.reduce((p, [, amount, category,]) => {
            p[category] ?
                p[category].amount += amount :
                p[category] = new CategoryAmount(category, amount);
            summ += amount;
            return p;
        }, {});

        return {
            data: Object.values(data).sort((a, b) => b.amount - a.amount),
            summ
        };
    }
}

class ResucedData {
    data: CategoryAmount[];
    summ: number;
    category?: string;
}

class CategoryAmount {

    constructor(category: string, amount: number, comment?: string) {
        this.category = category;
        this.amount = amount;
        this.comment = comment;
    }

    category: string;
    amount: number;
    comment?: string;
}