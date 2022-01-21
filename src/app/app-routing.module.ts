import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth-guard.guard';
import { DataGuard } from './guards/data.guard';
import { LoginGuard } from './guards/login-guard.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule), canActivate: [LoginGuard], 
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'cadastro',
    loadChildren: () => import('./cadastro/cadastro.module').then( m => m.CadastroPageModule), canActivate: [LoginGuard]
  },
  {
    path: 'inicio',
    loadChildren: () => import('./inicio/inicio.module').then( m => m.InicioPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'edicao-de-avisos',
    loadChildren: () => import('./edicao-de-avisos/edicao-de-avisos.module').then( m => m.EdicaoDeAvisosPageModule)
  },
  {
    path: 'editar-aviso',
    loadChildren: () => import('./editar-aviso/editar-aviso.module').then( m => m.EditarAvisoPageModule)
  },
  {
    path: 'visualizar-avisos',
    loadChildren: () => import('./visualizar-avisos/visualizar-avisos.module').then( m => m.VisualizarAvisosPageModule)
  },
  {
    path: 'detalhes-aviso',
    loadChildren: () => import('./detalhes-aviso/detalhes-aviso.module').then( m => m.DetalhesAvisoPageModule)
  },
  {
    path: 'edicao-do-cardapio',
    loadChildren: () => import('./edicao-do-cardapio/edicao-do-cardapio.module').then( m => m.EdicaoDoCardapioPageModule)
  },
  {
    path: 'visualizar-cardapio',
    loadChildren: () => import('./visualizar-cardapio/visualizar-cardapio.module').then( m => m.VisualizarCardapioPageModule)
  },
  {
    path: 'solicitacoes-de-matricula',
    loadChildren: () => import('./solicitacoes-de-matricula/solicitacoes-de-matricula.module').then( m => m.SolicitacoesDeMatriculaPageModule)
  },
  {
    path: 'cadastro-dados',
    loadChildren: () => import('./cadastro-dados/cadastro-dados.module').then( m => m.CadastroDadosPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'matricular-aluno',
    loadChildren: () => import('./matricular-aluno/matricular-aluno.module').then( m => m.MatricularAlunoPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
