import {Component, OnInit} from '@angular/core';
import {AbstractRestService} from "../../services/genericservice";
import {AppointmentGet} from "../../models/AppintmentGet";
import {Appointment} from "../../models/Appointment";
import {ActivatedRoute, Router} from "@angular/router";
import {environment} from "../../../environments/environment";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'app-appointments-patient',
    templateUrl: './appointments-patient.component.html',
    styleUrls: ['./appointments-patient.component.css']
})
export class AppointmentsPatientComponent implements OnInit {
    appointments !: Appointment[];
    role !: string;
    private path = `${environment.url}/api/appointments`;
    formGroup !: FormGroup;

    constructor(private service: AbstractRestService<Appointment>, private router: Router,
                private activeRoute: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.formGroup = new FormGroup({
            dateTimeCreation: new FormControl('', [Validators.required]),
            subject: new FormControl('', [Validators.required])
        });
        this.appointments = [
            {
                id: 1,
                subject: 'subject 1',
                dateCreation: new Date('2014-01-02 12:11:20'),
                patient:  {
                    id: 1,
                    firstname: 'omar',
                    lastname: 'triki',
                    email: 'omartriki712@gmail.com',
                    telephone: '+21624127616',
                    avatarUrl: '/assets/img/omartriki.png'
                },
                status: true,
                availability: {
                    id: 1,
                    dateTimeEnd: new Date('2014-04-01 22:01:01'),
                    dateTimeStart: new Date('2014-01-01 22:01:01'),
                    doctor: {
                        firstname: 'ahmed',
                        lastname: 'mizchani',
                        email: 'ahmed@gmail.com',
                        telephone: '+21424127616',
                        speciality: 'medecin générale',
                        avatarUrl: '/assets/avatar/omartriki.png'
                    }
                }
            }
        ];
        const role = localStorage.getItem('role');
        if (role != undefined)
            this.role = role;
        this.activeRoute.params.subscribe((params) => {
            this.service.list(this.path, {
                headers: {
                    Authorization: `Bearer`
                }
            })
        })
    }

    submit($event: Event) {

        this.appointments.push(
            {
                dateCreation: new Date(this.formGroup.value.dateTimeCreation),
                subject: this.formGroup.value.subject,
                status: false
            }
        )
    }

    delete(id: number | undefined, i: number) {
        console.log(id);
        this.appointments.splice(i, 1);
    }
}
