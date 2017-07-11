import { Component, OnInit, OnDestroy } from '@angular/core';
import { MessengerService } from '../messenger.service';
import { AprsService } from '../aprs.service';
import { AprsEntry } from '../models/aprs-entry';
import { GenericValue } from '../models/generic-value'; 
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

@Component({
  selector: 'app-hassp-presenter',
  templateUrl: './hassp-presenter.component.html',
  styleUrls: ['./hassp-presenter.component.css'],
  providers: [MessengerService, AprsService]
})
export class HasspPresenterComponent implements OnInit, OnDestroy {
  mode = 'Observable';

  connection;
  lastAprsData: AprsEntry;
  errorMessage;

  altitudeTransform: SafeStyle;
  velocityTransform: SafeStyle;

  altitude = 0;
  altitudeMax = 40000;

  velocity = 0;
  velocityMax = 200;

  title = {value:''} as GenericValue;
  scrollingText = {value:''} as GenericValue;

  testdata;
  
  constructor(private messengerService:MessengerService, private aprsService: AprsService, private sanitizer: DomSanitizer) {
    
  }

  setAltitude(altitude: number){
    this.altitude = altitude;
    var altitudeDegree = this.altitude / this.altitudeMax * 180;
    this.altitudeTransform = this.sanitizer.bypassSecurityTrustStyle("rotate(" + altitudeDegree + "deg)  translate3d(0, 0, 0)")
  }

  setVelocity(velocity: number){
    this.velocity = velocity;
    var velocityDegree = this.velocity / this.velocityMax * 180;
    this.velocityTransform = this.sanitizer.bypassSecurityTrustStyle("rotate(" + velocityDegree + "deg)  translate3d(0, 0, 0)")
  }

  getAprsData(){
      this.aprsService.getAprsData()
                    .subscribe(
                      value => this.updateData(value),
                      error =>  this.errorMessage = <any>error);
  }

  updateData(value: AprsEntry){
    this.lastAprsData = value;
    this.setAltitude(Number(this.lastAprsData.altitude));
    this.setVelocity(Number(this.lastAprsData.speed));
  }

  ngOnInit() {
    this.connection = this.messengerService.getTitle().subscribe(value => {
      this.title = (value as GenericValue);
    })

    this.connection = this.messengerService.getScrollingText().subscribe(value => {
      this.scrollingText = (value as GenericValue);
    })

    // https://codepen.io/Sambego/pen/zKLar

    // for twitter widget
    let twttr = (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0],
      t = twttr || {};
      if (d.getElementById(id)) return t;
      js = d.createElement(s);
      js.id = id;
      js.src = "https://platform.twitter.com/widgets.js";
      fjs.parentNode.insertBefore(js, fjs);
      t._e = [];
      t.ready = function(f) {
      t._e.push(f);
      };
      return t;
    }(document, "script", "twitter-wjs"));
    //setTimeout(function () { twttr.widgets.load(); }, 500);
    setInterval(() => {this.getAprsData()},1000*15);
  }
  
  ngOnDestroy() {
    this.connection.unsubscribe();
  }

}
