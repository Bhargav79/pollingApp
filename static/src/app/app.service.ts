import {Injectable} from '@angular/core';
import {Http, Headers, HttpModule} from '@angular/http';
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';

@Injectable()
export class PollService{

    constructor(private http:Http){

    }


    //Adding or update user and his poll using REST-API
    startpoll(poll){
      var headers= new Headers();
      headers.append('Content-Type','application/json');
      return this.http.post('poll', JSON.stringify(poll) , {headers:headers}).map(res => res.json());
    }

    //Getting Fruits Count using REST-API
    getAllFruit(snack){
      return this.http.get('fruit/'+ snack).map(res=>res.json());
    }


  }


