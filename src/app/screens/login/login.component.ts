import {Component, OnInit, ElementRef, OnDestroy} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginSignupService, Token} from "../../services/login-signup.service";
import {SecureStorageService} from "../../services/secure-storage.service";
import {saveDataToLocalhost} from "../../services/genericservice";
import {Router} from "@angular/router";
import {ConnectionService} from "../../services/connection.service";

declare var $: any;

@Component({
    selector: 'app-login',
    styleUrls: ['./login.component.css'],
    templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit, OnDestroy {
    test: Date = new Date();
    formGroup !: FormGroup;
    private toggleButton: any;
    private sidebarVisible: boolean;
    private nativeElement: Node;
    shown !: boolean;

    constructor(private element: ElementRef, private loginSignupService: LoginSignupService,
                private secureStorageService: SecureStorageService, private router: Router,
                private connection: ConnectionService) {
        this.nativeElement = element.nativeElement;
        this.sidebarVisible = false;
    }

    ngOnInit() {
        const navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];

        // body.classList.add('login-page');
        // body.classList.add('off-canvas-sidebar');
        // card.classList.remove('card-hidden');
        setTimeout(() => {
            // after 1000 ms we add the class animated to the login/register card
            this.shown = true;
        }, 100);
        this.formGroup = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required])
        });
    }

    ngOnDestroy() {
        const body = document.getElementsByTagName('body')[0];
        // body.classList.remove('off-canvas-sidebar');
    }

    submit($event: Event) {
        $event.preventDefault();
        this.loginSignupService.login(this.formGroup.value.email, this.formGroup.value.password).subscribe(async (response: Token) => {
            response.access = this.secureStorageService.setToken(response.access);
            response.refresh = this.secureStorageService.setToken(response.refresh);
            saveDataToLocalhost(response);
            this.connection.setConnection({firstname: response.firstname, lastname: response.lastname})
            await this.router.navigate(['/']);
        })
    }
}
