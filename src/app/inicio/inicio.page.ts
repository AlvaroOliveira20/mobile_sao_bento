import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AlertController, MenuController } from '@ionic/angular';
import { AuthService } from './../services/auth.service';
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  public user: any = {
    NomeResponsavel: null,
    CpfResponsavel: null,
    DataResponsavel: null,
    Endereco: null,
    NomeAluno: null,
    DataAluno: null,
    NomePai: null,
    NomeMae: null,
    Alergias: null,
    PlanoSaude: null,
    Telefone: null,
    Horario: null,
    ResponsavelFinanceiro: null,
    ResponsavelPedagogico: null,
    Email: null,
    Senha: null,
    Senha2: null,
    Admin: null
  };
  constructor(
    private afs: AngularFirestore,
    public alertController: AlertController,
    private menu: MenuController,
    private authService: AuthService,
    private router: Router
  ) {}
  logout() {
    this.presentAlert();
  }
  async ionViewWillEnter() {
    var user = firebase.auth().currentUser;
    let usuario = (
      await this.afs.firestore.collection('Users').doc(user.uid).get()
    ).data();
    this.user.NomeResponsavel = usuario.NomeResponsavel;
    this.user.Admin = usuario.Admin;
  }
  navigate(target){
    this.router.navigateByUrl("/"+target+"")
  }
  
  ngOnInit() {}
  //ABRE O MENU LATERAL
  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }
  //ALERT PARA DESLOGAR
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alerta',
      message:
        'Tem certeza que deseja sair da sua conta e voltar para a tela de login?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: cancelado');
          },
        },
        {
          text: 'Sair',
          handler: () => {
            this.authService.logout();
          },
        },
      ],
    });

    await alert.present();
  }
}
