import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class UrlShortenerService {

  private apiServerUrl = environment.apiBaseUrl;
  // headers: HttpHeaders = new HttpHeaders({
  //   Authorization: 'Basic ' + btoa("user" + ':' + "a6e161a5-90b7-4273-92e7-20141fe775ea")
  // });

  constructor(private httpClient: HttpClient) { }

  public createShortUrl(longUrl: string): Observable<any> {
    return this.httpClient.post(`${this.apiServerUrl}/app/rest/shorten`, {"longUrl" : longUrl});
  }

  public getLongUrl(shortUrl: string): Observable<any> {
    return this.httpClient.post(`${this.apiServerUrl}/app/rest/long`, {"shortUrl" : shortUrl});
  }

}
