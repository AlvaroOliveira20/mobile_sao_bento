import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-visualizar-avisos',
  templateUrl: './visualizar-avisos.page.html',
  styleUrls: ['./visualizar-avisos.page.scss'],
})
export class VisualizarAvisosPage implements OnInit {
  constructor(
    public navCtrl: NavController,
    public router: Router,
    private afs: AngularFirestore
  ) {}
  avisos = [];
  ativos = 0;
  inativos = 0;
  bg1 = 'rgb(250, 220, 165)';
  bg2 = 'rgba(0,0,0,0)';
  tab = 1;
  ngOnInit() {}
  async visualizar(uid) {
    localStorage.setItem('uid', uid);
    this.router.navigateByUrl('/detalhes-aviso');
  }
  async ionViewWillEnter() {
    this.avisos = [];
    let avisos: any = await this.afs.firestore.collection('Avisos').get();
    avisos = avisos.docs.map((doc) => doc.data());
    for (let i in avisos) {
      let data = avisos[i].Validade;
      var partesData = data.split("/");
      var dataFinal = new Date(partesData[2], partesData[1] - 1, Number(partesData[0])+1);
      if(dataFinal < new Date()){
        avisos[i].CanShow = false
        this.inativos++
      }else{
        avisos[i].CanShow = true
        this.ativos++
      }


      

      this.avisos.push(avisos[i]);
    }
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
