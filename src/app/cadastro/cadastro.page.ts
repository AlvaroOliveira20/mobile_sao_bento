import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {
  AlertController,
  LoadingController,
  ToastController,
} from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { MaskPipe } from 'ngx-mask';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {
  constructor(
    private afs: AngularFirestore,
    private afa: AngularFireAuth,
    public router: Router,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private maskPipe: MaskPipe,
    private alertController: AlertController
  ) {}
  userLogado: any;
  ngOnInit() {}
  navBack() {
    if (this.page != 1) {
      this.page--;
    } else {
      this.router.navigateByUrl('/home');
    }
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
  updateWithMaskCPF(event) {
    this.user.CpfResponsavel = this.maskPipe.transform(
      event.currentTarget.value,
      '000.000.000-00'
    );
  }

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
  public loading: any;
  public page = 1;

  ionViewWillEnter() {}
  proximo() {
    this.page++;
  }
  anterior() {
    this.page--;
  }
  async gravarDados() {
    alert(this.userLogado.uid);
    try {
      await this.afs.collection('Users').doc(this.userLogado.uid).set({
        //uid: this.userLogado.uid.toString(),
        NomeResponsavel: this.user.NomeResponsavel,
        // CpfResponsavel: this.user.CpfResponsavel,
        // DataResponsavel: this.user.DataResponsavel,
        // Endereco: this.user.Endereco,
        // Email: this.user.Email,
      });
    } catch (e) {
      alert(e);
    }
  }
  async cadastrar() {
    if (this.user.Senha == this.user.Senha2) {
      await this.presentLoading();
      try {
        let emailTemp = this.user.Email.split('@');
        if (emailTemp[1] != 'saobento.com') {
          await this.afa.createUserWithEmailAndPassword(
            this.user.Email,
            this.user.Senha
          );
          this.userLogado = firebase.auth().currentUser;
          this.afa.signOut();
          firebase.auth().currentUser.sendEmailVerification();
          this.presentAlertConfirm();
        } else {
          alert('erro');
        }
      } catch (error) {
        console.error(error);
        if (error.message == "Cannot read property 'split' of null") {
          error.message = 'Erro, email não digitado!';
        } else if (
          error.message ==
          'createUserWithEmailAndPassword failed: First argument "email" must be a valid string.'
        ) {
          error.message = 'Erro, email não digitado!';
        } else if (
          error.message ==
          'createUserWithEmailAndPassword failed: Second argument "password" must be a valid string.'
        ) {
          error.message = 'Erro, senha não digitada!';
        } else if (
          error.message ==
          'There is no user record corresponding to this identifier. The user may have been deleted.'
        ) {
          error.message = 'Erro, cadastro não encontrado!';
        } else if (error.message == 'The email address is badly formatted.') {
          error.message =
            'Erro, email não foi digitado corretamente, verifique e tente novamente!';
        } else if (
          error.message ==
          'The password is invalid or the user does not have a password.'
        ) {
          error.message = 'Email ou senha incorretos!';
        } else if (
          error.message ==
          'A network error (such as timeout, interrupted connection or unreachable host) has occurred.'
        ) {
          error.message =
            'Erro, não foi estabelecer uma conexão com a rede, verifique sua conexão e tente novamente!';
        } else if (
          error.message ==
          'The email address is already in use by another account.'
        ) {
          error.message = 'Ops! Esse e-mail já está sendo usado.';
        }
        this.presentToast(error.message);
      } finally {
        this.loading.dismiss();
      }
    } else {
      this.presentToast(
        'As senhas não conferem! Verifique-as e tente novamente.'
      );
    }
  }
  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Cadastro concluído!',
      message:
        'Sua conta foi criada! <strong>Verifique seu e-mail para continuar.</strong>',
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

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
    });
    toast.present();
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({
      message: 'Conectando...',
    });

    return this.loading.present();
  }
}
