import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {User} from "../../models/User";
import {Router} from "@angular/router";

@Component({
    selector: 'app-doctors', templateUrl: './doctors.component.html', styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent implements OnInit {
    @Input() rows !: User[];
    @Input() role !: string;

    constructor(private router: Router) {
    }

    ngOnInit(): void {
    }

    activateAccount(id: number | undefined) {
        console.log(id);
    }

    async goToAvailabilities(doctorId: number | undefined): Promise<void> {
        await this.router.navigate(['/availabilities-calendar', {doctorId: doctorId}])
    }
}
