import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AlertController,
  LoadingController,
  ToastController,
} from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import firebase from 'firebase/compat/app';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MaskPipe } from 'ngx-mask';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cadastro-dados',
  templateUrl: './cadastro-dados.page.html',
  styleUrls: ['./cadastro-dados.page.scss'],
})
export class CadastroDadosPage implements OnInit {
  constructor(
    private afs: AngularFirestore,
    private afa: AngularFireAuth,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private authService: AuthService,
    public alertController: AlertController,
    private maskPipe: MaskPipe,
    public router: Router
  ) {}
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
  };
  loading: any;
  ngOnInit() {}
  logout() {
    this.presentAlert();
  }
  updateWithMaskCPF(event) {
    this.user.CpfResponsavel = this.maskPipe.transform(
      event.currentTarget.value,
      '000.000.000-00'
    );
  }
  updateWithMaskDateR(event) {
    let aux = event.currentTarget.value.split('/');
    if (Number(aux[0]) > 31 && aux[1]) {
      this.user.DataResponsavel = '31' + '/' + aux[1] + '/' + aux[2];
    }
    if (Number(aux[1]) > 12 && aux[2]) {
      this.user.DataResponsavel = aux[0] + '/' + '12' + '/' + aux[2];
    }

    this.user.DataResponsavel = this.maskPipe.transform(
      this.user.DataResponsavel,
      '00/00/0000'
    );
  }

  updateWithMaskDateA(event) {
    let aux = event.currentTarget.value.split('/');
    if (Number(aux[0]) > 31 && aux[1]) {
      this.user.DataAluno = '31' + '/' + aux[1] + '/' + aux[2];
    }
    if (Number(aux[1]) > 12 && aux[2]) {
      this.user.DataAluno = aux[0] + '/' + '12' + '/' + aux[2];
    }

    this.user.DataAluno = this.maskPipe.transform(
      this.user.DataAluno,
      '00/00/0000'
    );
  }
  updateWithMaskTel(event) {
    if (event.currentTarget.value.length > 14) {
      this.user.Telefone = this.maskPipe.transform(
        this.user.Telefone,
        '(00) 0 0000-0000'
      );
    }
    if (event.currentTarget.value.length <= 14) {
      this.user.Telefone = this.maskPipe.transform(
        this.user.Telefone,
        '(00) 0000-0000'
      );
    }
    if (
      event.currentTarget.value.length < 16 &&
      event.currentTarget.value.split(' ').length == 3
    ) {
      this.user.Telefone = this.maskPipe.transform(
        this.user.Telefone,
        '(00) 0000-0000'
      );
    }
  }
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
  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
    });
    toast.present();
  }
  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Cadastro concluído!',
      message:
        'O seu cadastro está concluído.',
      buttons: [
        {
          text: 'Ok',
          id: 'confirm-button',
          handler: () => {
    
          },
        },
      ],
    });

    await alert.present();
  }
  async presentLoading() {
    this.loading = await this.loadingCtrl.create({
      message: 'Conectando...',
    });

    return this.loading.present();
  }
  async cadastrar() {
    if (this.user.Senha == this.user.Senha2) {
      if (!this.user.NomeResponsavel) {
        this.presentToast('Digite o nome do responsável!');
      } else if (!this.user.CpfResponsavel) {
        this.presentToast('Digite o CPF do responsável!');
      } else if (!this.user.DataResponsavel) {
        this.presentToast('Digite a data de nascimento do responsável!');
      } else if (this.user.DataResponsavel.length < 10) {
        this.presentToast('Data inválida!');
      } else if (!this.user.Endereco) {
        this.presentToast('Digite o Endereço do responsável!');
      } else {
        await this.presentLoading();
        try {
          let user = firebase.auth().currentUser;
          await this.afs.collection('Users').doc(user.uid).set({
            uid: user.uid,
            NomeResponsavel: this.user.NomeResponsavel,
            CpfResponsavel: this.user.CpfResponsavel,
            DataResponsavel: this.user.DataResponsavel,
            Endereco: this.user.Endereco,
            Email: this.user.Email,
          });

          await this.presentAlertConfirm();
          this.router.navigateByUrl("/inicio")
        } catch (error) {
          console.error(error);
         if (
            error.message ==
            'The email address is already in use by another account.'
          ) {
            error.message = 'Ops! Esse e-mail já está sendo usado.';
          }
          this.presentToast(error.message);
        } finally {
          this.loading.dismiss();
        }
      }
    } else {
      this.presentToast(
        'As senhas não conferem! Verifique-as e tente novamente.'
      );
    }
    
  }
  
}
