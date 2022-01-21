
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afa: AngularFireAuth) { }


  logout() {
    return this.afa.signOut();
  }

  getAuth() {
    return this.afa;
  }
}
