import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate  {
  constructor (private afs: AngularFirestore, private authService: AuthService, private router: Router){}
  canActivate(): Promise<boolean> {
    return new Promise(resolve => {
      this.authService.getAuth().onAuthStateChanged( async user => {
      if (user) {
        let usuario = (await this.afs.firestore.collection('Users').doc(user.uid).get()).data()
        if (!usuario) {
          this.router.navigate(['/cadastro-dados']);
        }else if (usuario) {
          this.router.navigate(['/inicio']);
        }
      }
        resolve(!user ? true : false);
      });
      

    })

    
  }
  
}
