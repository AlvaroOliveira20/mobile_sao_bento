import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import {
  AlertController,
  LoadingController,
  ToastController,
} from '@ionic/angular';
import { MaskPipe } from 'ngx-mask';
import PizZip from 'pizzip';
import PizZipUtils from 'pizzip/utils/index.js';
import { saveAs } from 'file-saver';
import Docxtemplater from 'docxtemplater';
import { AuthService } from '../services/auth.service';
import firebase from 'firebase/compat/app';
function loadFile(url: any, callback: any) {
  PizZipUtils.getBinaryContent(url, callback);
}

@Component({
  selector: 'app-matricular-aluno',
  templateUrl: './matricular-aluno.page.html',
  styleUrls: ['./matricular-aluno.page.scss'],
})
export class MatricularAlunoPage implements OnInit {
  constructor(
    private afs: AngularFirestore,
    private afa: AngularFireAuth,
    public router: Router,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private maskPipe: MaskPipe,
    private authService: AuthService,
    public alertController: AlertController
  ) {}

  ngOnInit() {}
  updateWithMaskCPF(event) {
    this.user.CpfAluno = this.maskPipe.transform(
      event.currentTarget.value,
      '000.000.000-00'
    );
  }
  updateWithMaskCPFP(event) {
    this.user.CpfPai = this.maskPipe.transform(
      event.currentTarget.value,
      '000.000.000-00'
    );
  }
  updateWithMaskCPFM(event) {
    this.user.CpfMae = this.maskPipe.transform(
      event.currentTarget.value,
      '000.000.000-00'
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

  updateWithMaskCEP(event) {
    this.user.CepAluno = this.maskPipe.transform(
      this.user.CepAluno,
      '00000-000'
    );
  }
  updateWithMaskTEL(event) {
    if (event.currentTarget.value.length > 14) {
      this.user.TelefoneContato = this.maskPipe.transform(
        this.user.TelefoneContato,
        '(00) 0 0000-0000'
      );
    }
    if (event.currentTarget.value.length <= 14) {
      this.user.TelefoneContato = this.maskPipe.transform(
        this.user.TelefoneContato,
        '(00) 0000-0000'
      );
    }
    if (
      event.currentTarget.value.length < 16 &&
      event.currentTarget.value.split(' ').length == 3
    ) {
      this.user.TelefoneContato = this.maskPipe.transform(
        this.user.TelefoneContato,
        '(00) 0000-0000'
      );
    }
  }
  checkboxSet(param: any) {
    if (eval(param)) {
      this.user.Termos = false;
    } else {
      this.user.Termos = true;
    }
  }
  next() {
    this.page++;
  }

  prev() {
    this.page--;
  }
  public page = 0;
  public user: any = {
    Termos: false,
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
    Responsavel: null
  };
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
      header: 'Solicitação Enviada!',
      message:
        'Sua solicitação foi recebida, seus dados serão analisados e caso tudo esteja correto, iremos disponibilizar o pagamento de acordo com a forma de pagamento selecionada. acompanhe o processo em "Matrículas"',
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
  loading: any;
  async presentLoading() {
    this.loading = await this.loadingCtrl.create({
      message: 'Conectando...',
    });

    return this.loading.present();
  }
  async finalizar() {
    if (!this.user.NomeAluno) {
      this.presentToast('Digite o nome do aluno!');
    } else if (!this.user.CpfAluno) {
      this.presentToast('Digite o Cpf do aluno!');
    } else if (!this.user.RgAluno) {
      this.presentToast('Digite o RG do Aluno!');
    } else if (!this.user.NaturalidadeAluno) {
      this.presentToast('Digite a Naturalidade do Aluno!');
    } else if (!this.user.DataAluno) {
      this.presentToast('Digite a Data do aluno!');
    } else if (!this.user.EnderecoAluno) {
      this.presentToast('Digite o Endereco do aluno!');
    } else if (!this.user.CepAluno) {
      this.presentToast('Digite o Cep!');
    } else if (!this.user.BairroAluno) {
      this.presentToast('Digite o Bairro!');
    } else if (!this.user.TelefoneContato) {
      this.presentToast('Digite o Telefone de contato!');
    } else if (!this.user.NomePai) {
      this.presentToast('Digite o Nome do Pai!');
    } else if (!this.user.CpfPai) {
      this.presentToast('Digite o cpf do Pai!');
    } else if (!this.user.RgPai) {
      this.presentToast('Digite o rg do Pai!');
    } else if (!this.user.TrabalhoPai) {
      this.presentToast('Digite o Trabalho do Pai!');
    } else if (!this.user.InstrucaoPai) {
      this.presentToast('Digite o Instrucao do Pai!');
    } else if (!this.user.NomeMae) {
      this.presentToast('Digite o Nome da mãe!');
    } else if (!this.user.CpfMae) {
      this.presentToast('Digite o cpf da mãe!');
    } else if (!this.user.RgMae) {
      this.presentToast('Digite o rg da mãe!');
    } else if (!this.user.TrabalhoMae) {
      this.presentToast('Digite o Trabalho da mãe!');
    } else if (!this.user.InstrucaoMae) {
      this.presentToast('Digite a Instrucao da mãe!');
    } else if (!this.user.Turma) {
      this.presentToast('Selecione a Turma!');
    } else if (!this.user.Horario) {
      this.presentToast('Selecione o Horario!');
    } else if (!this.user.FormaPagamento) {
      this.presentToast('Selecione a forma de pagamento!');
    } else {
      await this.presentLoading();
      let user = firebase.auth().currentUser;

      let matriculas: any = await this.afs.firestore
        .collection('Matriculas')
        .get();
      matriculas = matriculas.docs.map((doc) => doc.data());

      try {
        for (let i in matriculas) {
          if (
            matriculas[i].uid == user.uid &&
            matriculas[i].NomeAluno == this.user.NomeAluno &&
            !matriculas[i].Confirmado
          ) {
            const error = new Error(
              'Este aluno já possui uma solicitação de matrícula em avaliação!'
            );

            throw error;
          }
        }

        var data = new Date(),
          dia = data.getDate().toString(),
          diaF = dia.length == 1 ? '0' + dia : dia,
          mes = (data.getMonth() + 1).toString(),
          mesF = mes.length == 1 ? '0' + mes : mes,
          anoF = data.getFullYear(),
          hor = data.getHours(),
          min = data.getMinutes(),
          sec = data.getSeconds().toString(),
          
          mil: any = data.getMilliseconds().toString(),
          random = Math.floor(Math.random() * 10);
          if(sec.length == 1){
            sec = '0' + sec   
          }
        if (mil.toString().length == 1) {
          mil = mil + '00';
        } else if (mil.toString().length == 2) {
          mil = mil + '0';
        }

        // alert(anoF.toString()[2] + "-" +
        //       anoF.toString()[3] +"-" +
        //       mesF +"-" +
        //       diaF +"-" +
        //       hor +"-" +
        //       min +"-" +
        //       sec +"-" +
        //       mil +"-" +
        //       random)

        await this.afs
          .collection('Matriculas')
          .doc(
            anoF.toString()[2] +
              anoF.toString()[3] +
              mesF +
              diaF +
              hor +
              min +
              sec +
              mil +
              random
          )
          .set({
            NomeAluno: this.user.NomeAluno,
            CpfAluno: this.user.CpfAluno,
            RgAluno: this.user.RgAluno,
            NaturalidadeAluno: this.user.NaturalidadeAluno,
            DataAluno: this.user.DataAluno,
            EnderecoAluno: this.user.EnderecoAluno,
            CepAluno: this.user.CepAluno,
            BairroAluno: this.user.BairroAluno,
            TelefoneContato: this.user.TelefoneContato,
            AlergiaAluno: this.user.AlergiaAluno,
            RemediosAluno: this.user.RemediosAluno,
            PlanoSaudeAluno: this.user.PlanoSaudeAluno,
            NomePai: this.user.NomePai,
            CpfPai: this.user.CpfPai,
            RgPai: this.user.RgPai,
            TrabalhoPai: this.user.TrabalhoPai,
            InstrucaoPai: this.user.InstrucaoPai,
            NomeMae: this.user.NomeMae,
            CpfMae: this.user.CpfMae,
            RgMae: this.user.RgMae,
            TrabalhoMae: this.user.TrabalhoMae,
            InstrucaoMae: this.user.InstrucaoMae,
            Turma: this.user.Turma,
            Horario: this.user.Horario,
            uid: user.uid,
            Confirmado: 'aguardando-aprovacao',
            Data: diaF + '/' + mesF + '/' + anoF,
            numeroSolicitacao:
              anoF.toString()[2] +
              anoF.toString()[3] +
              mesF +
              diaF +
              hor +
              min +
              sec +
              mil +
              random,

            FormaPagamento: this.user.FormaPagamento,
            AnoMatricula: anoF.toString(),
            Responsavel: this.user.Responsavel
          });

        await this.presentAlertConfirm();
        this.router.navigateByUrl('/inicio');
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
  }

  navBack() {
    if (this.page == 0) {
      this.router.navigateByUrl('/inicio');
    } else {
      this.page--;
    }
  }
}
