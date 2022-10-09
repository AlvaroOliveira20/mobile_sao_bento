import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import {
  AlertController,
  LoadingController,
  ToastController,
} from '@ionic/angular';
import { MaskPipe } from 'ngx-mask';
import { Md5 } from 'ts-md5/dist/md5';
declare var $: any;
@Component({
  selector: 'app-editar-aviso',
  templateUrl: './editar-aviso.page.html',
  styleUrls: ['./editar-aviso.page.scss'],
})
export class EditarAvisoPage implements OnInit {
  constructor(
    private afs: AngularFirestore,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    public router: Router,
    private maskPipe: MaskPipe,
    public alertController: AlertController
  ) {}
  public user: any = {
    Mode: null,
    Titulo: null,
    Subtitulo: null,
    Data: null,
  };
  public data: any = {
    Title: 'Carregando...',
    Subtitle: 'Aguarde...',
    Content: '',
  };
  loading: any;
  updateWithMaskDate(event) {
    let aux = event.currentTarget.value.split('/');
    if (Number(aux[0]) > 31 && aux[1]) {
      this.user.Data = '31' + '/' + aux[1] + '/' + aux[2];
    }
    if (Number(aux[1]) > 12 && aux[2]) {
      this.user.Data = aux[0] + '/' + '12' + '/' + aux[2];
    }

    this.user.Data = this.maskPipe.transform(this.user.Data, '00/00/0000');
  }
  deletar() {
    this.presentAlert();
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: 'Tem certeza que deseja deletar o aviso?',
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
          text: 'Sim',
          handler: async () => {
            await this.presentLoading();
            try {
              await this.afs
                .collection('Avisos')
                .doc(localStorage.getItem('uid'))
                .delete();
              this.router.navigateByUrl('/edicao-de-avisos');
            } catch (e) {
              console.error(e);
            } finally {
              this.loading.dismiss();
            }
          },
        },
      ],
    });

    await alert.present();
  }
  async salvar() {
    if (!this.user.Titulo) {
      this.presentToast('Digite o Título!');
    } else if (!this.user.Data) {
      this.presentToast('Digite o vencimento!');
    }  else if (this.user.Data.length < 10) {
      this.presentToast('Data inválida!');
    } else {
      await this.presentLoading();
      try {
        let time = new Date();
        let hash = Md5.hashStr(time.toString());
        var data = new Date(),
          dia = data.getDate().toString(),
          diaF = dia.length == 1 ? '0' + dia : dia,
          mes = (data.getMonth() + 1).toString(),
          mesF = mes.length == 1 ? '0' + mes : mes,
          anoF = data.getFullYear();
        let date = diaF + '/' + mesF + '/' + anoF;
        if (localStorage.getItem('mode') == 'edit') {
          await this.afs
            .collection('Avisos')
            .doc(localStorage.getItem('uid'))
            .set({
              uid: localStorage.getItem('uid'),
              Title: this.user.Titulo,
              Subtitle: this.user.Subtitulo,
              CriadoEm: date,
              Validade: this.user.Data,
              Content: $('#summernote').summernote('code'),
            });
          this.router.navigateByUrl('/edicao-de-avisos');
        } else {
          await this.afs
            .collection('Avisos')
            .doc(hash)
            .set({
              uid: hash,
              Title: this.user.Titulo,
              Subtitle: this.user.Subtitulo,
              CriadoEm: date,
              Validade: this.user.Data,
              Content: $('#summernote').summernote('code'),
            });
          this.router.navigateByUrl('/visualizar-avisos');
        }
      } catch (e) {
        console.error(e);
      } finally {
        this.loading.dismiss();
      }
    }
  }
  ngOnInit() {
    this.user.Mode = localStorage.getItem("mode")
    $('#summernote').summernote({
      
      height: '200',
      width: "100%",
      
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
  async presentLoading() {
    this.loading = await this.loadingCtrl.create({
      message: 'Conectando...',
    });

    return this.loading.present();
  }
  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
    });
    toast.present();
  }
  navBack() {
    this.router.navigateByUrl('/edicao-de-avisos');
  }
  async ionViewWillEnter() {
    if (localStorage.getItem('mode') == 'edit') {
      this.data = (
        await this.afs.firestore
          .collection('Avisos')
          .doc(localStorage.getItem('uid'))
          .get()
      ).data();
      this.user.Titulo = this.data.Title;
      this.user.Subtitulo = this.data.Subtitle;
      this.user.Data = this.data.Validade;
      $('#summernote').summernote('code', this.data.Content);
    } else {
      this.user.Titulo = null;
      this.user.Subtitulo = null;
      this.user.Data = null;
    }
  }
}
