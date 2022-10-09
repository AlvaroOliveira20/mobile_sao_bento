import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import PizZip from 'pizzip';
import PizZipUtils from 'pizzip/utils/index.js';
import { saveAs } from 'file-saver';
import Docxtemplater from 'docxtemplater';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Pix } from 'faz-um-pix';

import {
  AlertController,
  LoadingController,
  ToastController,
} from '@ionic/angular';
import { MaskPipe } from 'ngx-mask';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';
import { AuthService } from '../services/auth.service';

function loadFile(url: any, callback: any) {
  PizZipUtils.getBinaryContent(url, callback);
}

@Component({
  selector: 'app-visualizar-matricula',
  templateUrl: './visualizar-matricula.page.html',
  styleUrls: ['./visualizar-matricula.page.scss'],
})
export class VisualizarMatriculaPage implements OnInit {
  constructor(
    private afs: AngularFirestore,
    private afa: AngularFireAuth,
    public router: Router,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private authService: AuthService,
    public alertController: AlertController,
    private androidPermissions: AndroidPermissions
  ) {}

  public data: any = {
    Title: 'Carregando...',
    Subtitle: 'Aguarde...',
    Content: '',
  };

  public responsavel: any;
  ngOnInit() {}
  public user: any = {
    NomeAluno: null,
    CpfAluno: null,
    RgAluno: null,
    NaturalidadeAluno: null,
    DataAluno: null,
    EnderecoAluno: null,
    CepAluno: null,
    BairroAluno: null,
    TelefoneContato: null,
    AlergiaAluno: null,
    RemediosAluno: null,
    PlanoSaudeAluno: false,
    NomePai: null,
    CpfPai: null,
    RgPai: null,
    TrabalhoPai: null,
    InstrucaoPai: null,
    NomeMae: null,
    CpfMae: null,
    RgMae: null,
    TrabalhoMae: null,
    InstrucaoMae: null,
    Turma: null,
    Horario: null,
    FormaPagamento: null,
    Responsavel: null,
  };
  async ionViewWillEnter() {
    //alert(code)
    this.data = (
      await this.afs.firestore
        .collection('Matriculas')
        .doc(localStorage.getItem('uid'))
        .get()
    ).data();
    let data: any = (
      await this.afs.firestore.collection('Users').doc(this.data.uid).get()
    ).data();
    this.responsavel = data.NomeResponsavel;
    (this.user.NomeAluno = data.NomeAluno),
      (this.user.CpfAluno = data.CpfAluno);
    this.user.RgAluno = data.RgAluno;
    this.user.NaturalidadeAluno = data.NaturalidadeAluno;
    this.user.DataAluno = data.DataAluno;
    this.user.EnderecoAluno = data.EnderecoAluno;
    this.user.CepAluno = data.CepAluno;
    this.user.BairroAluno = data.BairroAluno;
    this.user.TelefoneContato = data.TelefoneContato;
    this.user.AlergiaAluno = data.AlergiaAluno;
    this.user.RemediosAluno = data.RemediosAluno;
    this.user.PlanoSaudeAluno = data.PlanoSaudeAluno;
    this.user.NomePai = data.NomePai;
    this.user.CpfPai = data.CpfPai;
    this.user.RgPai = data.RgPai;
    this.user.TrabalhoPai = data.TrabalhoPai;
    this.user.InstrucaoPai = data.InstrucaoPai;
    this.user.NomeMae = data.NomeMae;
    this.user.CpfMae = data.CpfMae;
    this.user.RgMae = data.RgMae;
    this.user.TrabalhoMae = data.TrabalhoMae;
    this.user.InstrucaoMae = data.InstrucaoMae;
    this.user.Turma = data.Turma;
    this.user.Horario = data.Horario;
    this.user.FormaPagamento = data.FormaPagamento;
    this.user.Responsavel = data.Responsavel;
  }
  navBack() {
    this.router.navigateByUrl('/solicitacoes-de-matricula');
  }
  async confirmar() {
    if(this.data.FormaPagamento=="PIX")
      alert("PIX")
    else
      alert("BOLETO")
    //await this.presentAlert();
  }
  async revogar() {
    await this.presentAlert2();
  }
  async emitir() {
    await this.presentLoading();
    var user = this.data;

    var data = new Date(),
      dia = data.getDate().toString(),
      diaF = dia.length == 1 ? '0' + dia : dia,
      mes = (data.getMonth() + 1).toString(),
      mesF = mes.length == 1 ? '0' + mes : mes,
      anoF = data.getFullYear(),
      hor = data.getHours(),
      min = data.getMinutes(),
      sec = data.getSeconds(),
      mil = data.getMilliseconds();
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alerta',
      message:
        'Deseja passar o status da solicitação para "AGUARDANDO PAGAMENTO"?',
      buttons: [
        {
          text: 'NÃO',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: cancelado');
          },
        },
        {
          text: 'SIM',

          handler: async () => {
            await this.presentLoading();
            try {
              console.log();
              await this.afs
                .collection('Matriculas')
                .doc(this.data.numeroSolicitacao)
                .update({
                  Confirmado: 'aguardando-pagamento',
                  //pix: Pix("b05ed396-7df8-4cde-9d27-723ad670590d", "ÁLVARO OLIVEIRA", "MACEIÓ", 10, "TESTE")
                });
              this.data = (
                await this.afs.firestore
                  .collection('Matriculas')
                  .doc(localStorage.getItem('uid'))
                  .get()
              ).data();
            } catch (e) {
            } finally {
              this.loading.dismiss();
            }
          },
        },
      ],
    });

    await alert.present();
  }

  async presentAlert2() {
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: 'Deseja passar o status da solicitação para "REVOGADA"?',
      buttons: [
        {
          text: 'NÃO',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: cancelado');
          },
        },
        {
          text: 'SIM',
          handler: async () => {
            await this.presentLoading();
            try {
              await this.afs
                .collection('Matriculas')
                .doc(this.data.numeroSolicitacao)
                .update({
                  Confirmado: 'revogada',
                });
              this.data = (
                await this.afs.firestore
                  .collection('Matriculas')
                  .doc(localStorage.getItem('uid'))
                  .get()
              ).data();
            } catch (e) {
            } finally {
              this.loading.dismiss();
            }
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
  loading: any;
  async presentLoading() {
    this.loading = await this.loadingCtrl.create({
      message: 'Conectando...',
    });

    return this.loading.present();
  }
  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Concluído!',
      message: 'Documento emitido.',
      buttons: [
        {
          text: 'Ok',
          id: 'confirm-button',
          handler: () => {},
        },
      ],
    });

    await alert.present();
  }
}
