import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detalhes-aviso',
  templateUrl: './detalhes-aviso.page.html',
  styleUrls: ['./detalhes-aviso.page.scss'],
})
export class DetalhesAvisoPage implements OnInit {
  constructor(private afs: AngularFirestore, public router: Router) {}
  public data: any = {
    PaginaCarregada: null,
    Title: null,
    Subtitle: null,
    Content: null,
  };
  ngOnInit() {}
  async ionViewWillEnter() {
    this.data.PaginaCarregada = false;
    this.data = (
      await this.afs.firestore
        .collection('Avisos')
        .doc(localStorage.getItem('uid'))
        .get()
    ).data();
    this.data.PaginaCarregada = true
  }
  navBack() {
    this.router.navigateByUrl('/visualizar-avisos');
  }
}
