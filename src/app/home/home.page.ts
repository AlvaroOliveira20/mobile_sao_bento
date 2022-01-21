import { Component } from '@angular/core';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { LoadingController, ToastController } from '@ionic/angular';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
@Component({
  providers: [Keyboard],
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(
    public keyboard: Keyboard,
    private afa: AngularFireAuth,
    public router: Router,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {}

  isKeyboardHide = true;
  public user: any = {
    Email: null,
    Senha: null,
  };
  public loading: any;

  ionViewWillEnter() {
    this.keyboard.onKeyboardWillShow().subscribe(() => {
      this.isKeyboardHide = false;
      // console.log('SHOWK');
    });

    this.keyboard.onKeyboardWillHide().subscribe(() => {
      this.isKeyboardHide = true;
      // console.log('HIDEK');
    });
    
  }

  async login() {
    await this.presentLoading();

    try {
      await this.afa.signInWithEmailAndPassword(
        this.user.Email,
        this.user.Senha
      );
      // if (!firebase.auth().currentUser.emailVerified) {
      //   firebase.auth().signOut();
      //   this.presentToast(
      //     'Verifique sua caixa de entrada e confirme seu e-mail!'
      //   );
      // }
    } catch (error) {
      console.error(error);
      if (
        error.message ==
        'Firebase: Error (auth/missing-email).'
      ) {
        error.message = 'E-mail não digitado!';
      } else if (
        error.message ==
        'signInWithEmailAndPassword failed: Second argument "password" must be a valid string.'
      ) {
        error.message = 'Erro, senha não digitada!';
      } else if (
        error.message ==
        'Firebase: There is no user record corresponding to this identifier. The user may have been deleted. (auth/user-not-found).'
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
      }
      this.presentToast(error.message);
    } finally {
      this.loading.dismiss();
    }
  }
  cadastro(){
    this.router.navigateByUrl("/cadastro")
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
