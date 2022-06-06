import {Component, Input, OnInit} from '@angular/core';
import {AppointmentGet} from "../../models/AppintmentGet";
import {Appointment} from "../../models/Appointment";

@Component({
    selector: 'app-consultations',
    templateUrl: './consultations.component.html',
    styleUrls: ['./consultations.component.css']
})
export class ConsultationsComponent implements OnInit {
    @Input() rows !: Appointment[];
    @Input() role !: string;

    constructor() {
    }

    ngOnInit(): void {

    }

    delete(id: number | undefined, i: number) {

    }
}
