import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class UrlShortenerService {

  url: string = 'localhost:8080/';
  // headers: HttpHeaders = new HttpHeaders({
  //   Authorization: 'Basic ' + btoa("user" + ':' + "a6e161a5-90b7-4273-92e7-20141fe775ea")
  // });

  constructor(private httpClient: HttpClient) { }

  public createShortUrl(longUrl: string): Observable<any> {
    return this.httpClient.post(this.url + "app/rest/shorten", longUrl);
  }

  public getLongUrl(shortUrl: string): Observable<any> {
    return this.httpClient.post(this.url + "app/rest/shorten", shortUrl);
  }

}
