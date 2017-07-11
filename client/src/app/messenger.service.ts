import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';
import { GenericValue } from './models/generic-value'

@Injectable()
export class MessengerService {

  private url = 'http://localhost:5000';  
  private socket;
  
  // Title
  setTitle(value: GenericValue){
    this.socket.emit('set-title', value);    
  }

  getTitle(): Observable<GenericValue>{
    return this.getObservableValue('new-title') as Observable<GenericValue>;
  }


  // Scrolling Text
  setScrollingText(value: GenericValue){
    this.socket.emit('set-scrollingtext', value);    
  }

  getScrollingText(): Observable<GenericValue>{
    return this.getObservableValue('new-scrollingtext') as Observable<GenericValue>;
  }

  // Add Messages
  sendMessage(message){
    this.socket.emit('add-message', message);    
  }

  getMessages() {
    return this.getObservableValue('message');
  }

  private getObservableValue(valueName){
      let observable = new Observable(observer => {
      this.socket = io(this.url);
      this.socket.on(valueName, (data) => {
        observer.next(data);    
      });
      return () => {
        this.socket.disconnect();
      };  
    })     
    return observable;
  }
  
}
