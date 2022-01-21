import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-solicitacoes-de-matricula',
  templateUrl: './solicitacoes-de-matricula.page.html',
  styleUrls: ['./solicitacoes-de-matricula.page.scss'],
})
export class SolicitacoesDeMatriculaPage implements OnInit {
  constructor(
    public navCtrl: NavController,
    public router: Router,
    private afs: AngularFirestore
  ) {}
  bg1 = 'rgb(250, 220, 165)';
  bg2 = 'rgba(0,0,0,0)';
  tab = 1;
  ngOnInit() {}

  async ionViewWillEnter() {
  }
  navBack() {
    this.router.navigateByUrl('/inicio');
  }
  activateTab(tab: any) {
    if (tab == 1) {
      this.tab = 1;
      this.bg1 = 'rgb(250, 220, 165)';
      this.bg2 = 'rgba(0,0,0,0)';
    } else {
      this.tab = 2;
      this.bg2 = 'rgb(250, 220, 165)';
      this.bg1 = 'rgba(0,0,0,0)';
    }
  }
}
