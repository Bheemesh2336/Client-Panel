import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CanActivate, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthGaurd implements CanActivate {
    constructor(
        private router: Router,
        private afauth: AngularFireAuth
    ) { }
    canActivate(): Observable<boolean> {
        return this.afauth.authState.pipe(map(auth => {
            if (!auth) {
                this.router.navigate(['/login']);
                return false;
            }
            else {
                return true;
            }
        }));
    }
}