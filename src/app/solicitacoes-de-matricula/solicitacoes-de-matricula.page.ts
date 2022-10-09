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

  matriculas = [];
  ativos = 0;
  inativos = 0;
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
  async visualizar(uid) {
    localStorage.setItem('uid', uid);
    this.router.navigateByUrl('/visualizar-matricula');
  }
  async ionViewWillEnter() {
    this.matriculas = [];
    let matriculas: any = await this.afs.firestore.collection('Matriculas').get();
    matriculas = matriculas.docs.map((doc) => doc.data());
    for (let i in matriculas) {
      //let data = matriculas[i].Validade;
      //var partesData = data.split("/");
      //var dataFinal = new Date(partesData[2], partesData[1] - 1, Number(partesData[0])+1);
      // if(dataFinal < new Date()){
      //   matriculas[i].CanShow = false
      //   this.inativos++
      // }else{
      //   matriculas[i].CanShow = true
      //   this.ativos++
      let data: any = (await this.afs.firestore.collection('Users').doc(matriculas[i].uid).get()).data()
      matriculas[i].Responsavel = data.NomeResponsavel
      // }
      this.matriculas.push(matriculas[i]);
    }
  }
}
