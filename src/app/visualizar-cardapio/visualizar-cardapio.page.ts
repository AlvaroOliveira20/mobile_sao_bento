import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser'

@Component({
  selector: 'app-visualizar-cardapio',
  templateUrl: './visualizar-cardapio.page.html',
  styleUrls: ['./visualizar-cardapio.page.scss'],
})
export class VisualizarCardapioPage implements OnInit {
  public data: any = {
    Title: 'Carregando...',
    Subtitle: 'Aguarde...',
    Content: '',

  };
  constructor(private sanitizer: DomSanitizer, private afs: AngularFirestore, public router: Router) { }
  async ionViewWillEnter() {
    this.data = (
      await this.afs.firestore
        .collection('Cardapio')
        .doc("cardapio")
        .get()
    ).data();

  }
  navBack() {
    this.router.navigateByUrl('inicio');
  }
  ngOnInit() {
  }

}
