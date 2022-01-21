import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root',
})
export class DataGuard implements CanActivate {
  constructor (private afs: AngularFirestore,
    private afa: AngularFireAuth,private router: Router, ){}
  
    async canActivate(): Promise<boolean> {
      
        const user =  firebase.auth().currentUser;

        const usuario = (await this.afs.firestore.collection('Users').doc(user.uid).get()).data();
        if (usuario.NomeResponsavel != null){
          
          //return true;
        }else{
          //this.router.navigateByUrl('/cadastro-dados')
        }

        
        return true;
    
    // return new Promise(resolve => {
    
  }
}