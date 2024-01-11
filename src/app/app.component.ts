import { Component } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders, HttpParams, HttpRequest,HttpClientJsonpModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {BaseRequestOptions, RequestOptions} from '@angular/http';
import { lastValueFrom } from 'rxjs/internal/lastValueFrom';
import { EMPTY } from 'rxjs';
//import 'rxjs/add/operator/toPromise';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,HttpClientModule,HttpClientJsonpModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  
})


export class AppComponent {
  title = 'my-app';

  apiRoot: string = "http://httpbin.org"; 

  constructor(private http: HttpClient) { } 

  search() {
  let promise = new Promise<void>((resolve, reject) => {
    let apiURL = `${this.apiRoot}`;
    this.http.get(apiURL)
      .toPromise()
      .then(
        res => { // Success
          console.log(res?.toString());
          resolve();
        }
      );
  });
  return promise;
}

  doGET() {
      console.log("GET");
      let url = `${this.apiRoot}/get`;
      // let search = new URLSearchParams();
      // search.set('foo', 'moo');
      // search.set('limit', '23');
      this.http.get(url,{}).subscribe(res => console.log(res.toString()));
    }

  doPOST() {
      console.log("POST");
      let url = `${this.apiRoot}/post`;
      this.http.post(url, {moo:"foo",goo:"loo"}).subscribe(res => console.log(res.toString()));
    }

  doPUT() {
      console.log("PUT");
      let url = `${this.apiRoot}/put`;
      let search = new URLSearchParams();
      search.set('foo', 'moo')
      this.http.put(url, {moo:"foo",goo:"loo"},{}).subscribe(res => console.log(res.toString()));
   
  }

  doDELETE() {
    console.log("DELETE");
  }

   doGETAsPromise() {
    console.log("GET AS PROMISE");
    let url = `${this.apiRoot}/get`;
    this.http.get(url)
      .toPromise()
      .then(res => console.log(res?.toString()));
  }

  doGETAsPromiseError() {
    console.log("GET AS PROMISE ERROR");
    let url = `${this.apiRoot}/post`;
    this.http.get(url)
      .toPromise()
      .then(
        res => console.log(res?.toString()),
        msg => console.error(`Error: ${msg.status} ${msg.statusText}`) 
      );
  }

  doGETAsObservableError() {
    console.log("GET AS OBSERVABLE ERROR");
    let url = `${this.apiRoot}/post`;
    this.http.get(url).subscribe(
      res => console.log(res.toString()),
      msg => console.error(`Error: ${msg.status} ${msg.statusText}`)
    );
  }

  async doGETAsObservableHttp() {
    console.log("GET AS OBSERVABLE http");
    let url = `${this.apiRoot}/get`;
    const data$ = this.http.get(url)
    const value = await lastValueFrom(data$)//data$.toPromise()
    console.log('value ->', value)
    
  }
  
  async doGETAsObservableHttpError() {
    console.log("GET AS OBSERVABLE http");
    let url = `${this.apiRoot}/gett`;
    const data$ = undefined// this.http.get(url)
    const value = await lastValueFrom(EMPTY,{defaultValue: 'no value'})?? 'value is undefined'
    console.log('value ->', value)
    
  }

  doGETWithHeaders() {
    console.log("GET WITH HEADERS");
    let headers = new Headers();
    const options = {
     headers: new HttpHeaders().append('Authorization', btoa('username:password')),
    }
    let url = `${this.apiRoot}/get`;
    this.http.get(url, options).subscribe(
      res => console.log(res.toString()),
      msg => console.error(`Error: ${msg.status} ${msg.statusText}`)
    );
  }

}
