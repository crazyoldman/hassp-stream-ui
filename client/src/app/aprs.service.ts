import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { AprsEntry } from './models/aprs-entry';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AprsService {

  private aprsUrl = '/api/aprsdata';

  private altitudeObserver;
  private latitudeObserver;
  private longitudeObserver;
  private speedObserver;
  private timeObserver;

  constructor(private http: Http) { }

  public getAprsData(): Observable<AprsEntry> {
    return this.http.get(this.aprsUrl)
                    .map(this.mapData);    
  }

  private mapData(response: Response) : AprsEntry {
    //console.log(response.json());
    return response.json() as AprsEntry;
  }

}
