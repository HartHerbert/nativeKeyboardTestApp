import {Component, ViewChild} from '@angular/core';
import { Content, NavController, Platform} from 'ionic-angular';

declare let NativeKeyboard;

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})


export class AboutPage {

  @ViewChild(Content) content:Content;


  constructor(public navCtrl: NavController, public platform:Platform) {

  }


}
