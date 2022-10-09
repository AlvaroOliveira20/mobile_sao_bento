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
    PaginaCarregada: null,
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
  newdate(){
    let i = 0
    while ( i < 100){
      i++
      var data = new Date(),
      dia = data.getDate().toString(),
      diaF = dia.length == 1 ? '0' + dia : dia,
      mes = (data.getMonth() + 1).toString(),
      mesF = mes.length == 1 ? '0' + mes : mes,
      anoF = data.getFullYear(),
      hor = data.getHours(),
      min = data.getMinutes(),
      sec = data.getSeconds(),
      mil:any = data.getMilliseconds().toString()
      if(mil.toString().length == 1){
        mil = mil + '00'
      }else if (mil.toString().length == 2){
        mil = mil + '0'  
      }

    

    console.log(anoF.toString()[2]+anoF.toString()[3]+mil+Math.round((100+(Math.random()*(999-100)))))
  }
    } 
    
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
    this.user.PaginaCarregada = false;
    var user = firebase.auth().currentUser;
    let usuario = (
      await this.afs.firestore.collection('Users').doc(user.uid).get()
    ).data();
    this.user.NomeResponsavel = usuario.NomeResponsavel;
    this.user.Admin = usuario.Admin;
    this.user.PaginaCarregada = true;
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
