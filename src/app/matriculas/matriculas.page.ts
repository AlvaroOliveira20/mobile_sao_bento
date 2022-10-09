import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import firebase from 'firebase/compat/app';
@Component({
  selector: 'app-matriculas',
  templateUrl: './matriculas.page.html',
  styleUrls: ['./matriculas.page.scss'],
})
export class MatriculasPage implements OnInit {

  constructor( public navCtrl: NavController,
    public router: Router,
    private afs: AngularFirestore) { }
  PaginaCarregada=false;
  alunos = []
  ngOnInit() {
  }
  navBack(){
    this.router.navigateByUrl("/inicio")
  }

  async ionViewWillEnter() {
    this.PaginaCarregada= false
    this.alunos = [];
    let alunos: any = await this.afs.firestore.collection('Matriculas').get();
    alunos = alunos.docs.map((doc) => doc.data());
    let user = firebase.auth().currentUser;
    for (let i in alunos) {
      if(alunos[i].uid==user.uid)          
        this.alunos.push(alunos[i]);
    }
    this.PaginaCarregada= true
  }

}
