import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {User} from "../../models/User";

@Component({
    selector: 'app-doctors', templateUrl: './doctors.component.html', styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent implements OnInit {
    @Input() rows !: User[];
    @Input() role !: string;

    constructor() {
    }

    ngOnInit(): void {
    }

    activateAccount(id: number | undefined) {
        console.log(id);
    }

}
