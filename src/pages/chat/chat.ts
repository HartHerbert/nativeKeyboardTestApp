import {Component, NgZone, Renderer2, ViewChild} from '@angular/core';
import {Content, IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import {Keyboard} from "@ionic-native/keyboard";


/**
 * Generated class for the ChatPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

declare let NativeKeyboard;

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  @ViewChild(Content) content:Content;
  public key:number;
  public shouldScroll:boolean = true;
  public ngZone:NgZone;


  constructor(public navCtrl: NavController, public navParams: NavParams,
              public platform:Platform, public keyboard:Keyboard, private renderer:Renderer2) {

    this.ngZone = new NgZone({enableLongStackTrace:false});

    platform.ready().then(()=>{

      if (this.platform.is('ios')) {
        this.keyboard.disableScroll(true);
      }
      this.generateKey();
      //setup the Messenger
      this.setupMessenger();
    })
  }

  generateKey(){
    this.key = Math.random();
    console.log("CHANGED KEY TO:", this.key);
  }

  sendMessage = (text:string) =>{

    //HERE I WILL DISPLAY A KEY IN THE CONSOLE LOG
    //Look that the first key that was added to the keyboard
    //is will not get updated, the second time the keyboard get setup by this.setupMessenger()

    //this shows that the onSubmit-Event never update the function.
    //the first function added to the onSubmit of the keyboard can't be overwritten


    console.log("SENT MESSAGE: ", text);
    console.log("KEYBOARD KEY: ", this.key);

  }

  setScrollPadding(padding:number){
    this.renderer.setStyle(this.content.getScrollElement(),'padding-bottom',padding+'px');
    //this.content.getScrollElement().style.paddingBottom = padding+'px';
  }

  onKeyboardShow = (height:number) => {
    this.ngZone.run(()=>{
      this.setScrollPadding(height);
    });
    console.log("keyboard will show, height is: " + height);
  }

  onKeyboardHide = () => {
    this.ngZone.run(()=>{
      //this.content.addScrollPadding(10);
      this.setScrollPadding(10);
      this.shouldScroll = true;
      console.log("keyboard will hide");
    });
  }

  scroll(){
    this.shouldScroll = false;
    setTimeout(()=>{
      this.content.scrollToBottom(0);
    },300);
  }

  ionViewWillLeave(){
    console.log("LEAVING PAGE");
    NativeKeyboard.hideMessenger({
      animated: false
    });
  }

  setupMessenger(){

    this.platform.ready().then(()=>{

      NativeKeyboard.showMessenger({
        onSubmit: this.sendMessage,
        autoscrollElement: this.content.getScrollElement(),
        showKeyboard: true,
        type: "twitter",
        appearance: "light",
        secure: false,
        //autocorrectionEnabled: true,
        scrollToBottomAfterMessengerShows: true,
        keepOpenAfterSubmit: true,
        animated: true,
        text: "",
        placeholder: 'Type your message',
        placeholderColor: "#DDDDDD",
        textViewBackgroundColor: "#FFFFFF",
        backgroundColor: "#F6F6F6",
        textViewBorderColor: "#F6F6F6",
        maxChars: 0,
        counterStyle: 'none',
        textColor: '#555555',
        rightButton: {
          type: 'ionicon',
          value: '\uf474',
          textStyle: 'normal'
        }
      });
      //document.getElementsByTagName("body")[0].style.position = 'fixed';
    });
  }

}
