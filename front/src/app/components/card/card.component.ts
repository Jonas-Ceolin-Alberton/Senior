import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
    @Input() titulo: string;
    @Output() fecharCardEvent: EventEmitter<any> = new EventEmitter();

    constructor() { }

    ngOnInit() {
    }

    fecharCard(): void {
        this.fecharCardEvent.emit();
    }
}
