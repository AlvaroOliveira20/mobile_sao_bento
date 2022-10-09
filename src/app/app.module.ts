import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';

import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from './../environments/environment';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';
import {File} from '@ionic-native/file/ngx';
@NgModule({
  declarations: [AppComponent, SafeHtmlPipe],
  entryComponents: [],
  exports: [SafeHtmlPipe],
  imports: [
    BrowserModule,
    NgxMaskModule.forRoot(),
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
  ],
  
  providers: [File, AndroidPermissions, { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
