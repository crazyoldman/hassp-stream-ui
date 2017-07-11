import { Component, OnInit, OnDestroy } from '@angular/core';
import { MessengerService } from '../messenger.service'
import { AprsService } from '../aprs.service'
import { GenericValue } from '../models/generic-value'; 

@Component({
  selector: 'app-hassp-controller',
  templateUrl: './hassp-controller.component.html',
  styleUrls: ['./hassp-controller.component.css'],
  providers: [MessengerService, AprsService]
})
export class HasspControllerComponent implements OnInit, OnDestroy {
  connection;
  
  title = {value:'N/A'} as GenericValue;
  newTitle: string;

  scrollingText = {value:'N/A'} as GenericValue;
  newScrollingText: string;

  constructor(private messengerService:MessengerService, private aprsService: AprsService) {}


  setTitle(){
    this.messengerService.setTitle({value: this.newTitle} as GenericValue);
    this.newTitle = '';
  }


  setScrollingText(){
    this.messengerService.setScrollingText({value: this.newScrollingText} as GenericValue);
    this.newScrollingText = '';
  }


  ngOnInit() {
    this.connection = this.messengerService.getTitle().subscribe(value => {
      this.title = (value as GenericValue);
    })

    this.connection = this.messengerService.getScrollingText().subscribe(value => {
      this.scrollingText = (value as GenericValue);
    })
  }
  
  ngOnDestroy() {
    this.connection.unsubscribe();
  }
}
