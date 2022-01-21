import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

import {
  AlertController,
  LoadingController,
  ToastController,
} from '@ionic/angular';
declare var $: any;
@Component({
  selector: 'app-edicao-do-cardapio',
  templateUrl: './edicao-do-cardapio.page.html',
  styleUrls: ['./edicao-do-cardapio.page.scss'],
})
export class EdicaoDoCardapioPage implements OnInit {
  constructor(

    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    public alertController: AlertController,
    private router: Router,
    private afs: AngularFirestore
  ) {}
  public user: any = {
    Titulo: null,
  };
  public data: any = {
    Title: 'Carregando...',
    Subtitle: 'Aguarde...',
    Content: '',
  };
  async ionViewWillEnter(){
    this.data = (
      await this.afs.firestore
        .collection('Cardapio')
        .doc("cardapio")
        .get()
    ).data();
    this.user.Titulo = this.data.Title
    $('#summernote').summernote('code', this.data.Content);
  }
  loading: any;
  navBack() {
    this.router.navigateByUrl('/inicio');
  }
  async salvar() {
    if (!this.user.Titulo) {
      this.presentToast('Digite o Título!');
    } else {
      await this.presentLoading();
      try {
        await this.afs
          .collection('Cardapio')
          .doc('cardapio')
          .set({
            Title: this.user.Titulo,
            Content: $('#summernote').summernote('code'),
          });
          this.router.navigateByUrl("/inicio")
      } catch (e) {
        this.presentToast("ERRO: " + e);
      } finally {
        this.loading.dismiss();
      }
    }
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
  ngOnInit() {
    $('#summernote').summernote({
      height: '200',
      width: $(window).width() * 0.8,
      toolbar: [
        ['style', ['bold', 'italic', 'underline']],
        ['para', ['ul', 'ol', 'paragraph']],
        ['height', ['height']],
        ['fontsize', ['fontsize']],
        ['insert', ['picture']],
        ['color', ['color']]
      ],
    });
  }
}
