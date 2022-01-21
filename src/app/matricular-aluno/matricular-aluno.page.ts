import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { MaskPipe } from 'ngx-mask';


@Component({
  selector: 'app-matricular-aluno',
  templateUrl: './matricular-aluno.page.html',
  styleUrls: ['./matricular-aluno.page.scss'],
})
export class MatricularAlunoPage implements OnInit {

  constructor(private afs: AngularFirestore,
    private afa: AngularFireAuth,
    public router: Router,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private maskPipe: MaskPipe,
    private alertController: AlertController) { }

  ngOnInit() {
  }
  next(){
    this.page++
  }
  prev()
  {
    this.page--
  }
  public page = 1;
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

  navBack(){
    if(this.page == 1){
      this.router.navigateByUrl("/inicio")
    }else{
      this.page--
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

}
