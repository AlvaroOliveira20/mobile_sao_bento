import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edicao-de-avisos',
  templateUrl: './edicao-de-avisos.page.html',
  styleUrls: ['./edicao-de-avisos.page.scss'],
})
export class EdicaoDeAvisosPage implements OnInit {

  constructor(private afs: AngularFirestore, public router: Router) { }
  avisos = [];
  ngOnInit() {
  }
  navBack() {
   
      this.router.navigateByUrl('/inicio');
  
  }
  editar(uid){
    localStorage.setItem('mode', "edit");
    localStorage.setItem('uid', uid);
    this.router.navigateByUrl('/editar-aviso');
  }
  async ionViewWillEnter() {
    this.avisos = [];
    let avisos: any = await this.afs.firestore.collection('Avisos').get();
    avisos = avisos.docs.map((doc) => doc.data());
    for (let i in avisos) {
      let data = avisos[i].Validade;
      

      var partesData = data.split("/");
      var dataFinal = new Date(partesData[2], partesData[1] - 1, Number(partesData[0])+1);
      if(dataFinal < new Date()){
        avisos[i].CanShow = false
      
      }else{
        avisos[i].CanShow = true

      }


      

      this.avisos.push(avisos[i]);
    }
  }
  criar(){
    localStorage.setItem('mode', "create");
    this.router.navigateByUrl('/editar-aviso');

  }

}
