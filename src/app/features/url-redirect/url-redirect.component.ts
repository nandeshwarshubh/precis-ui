import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { UrlShortenerService } from '../url-shortener/url-shortener.service';

@Component({
  selector: 'app-url-redirect',
  templateUrl: './url-redirect.component.html'
})
export class UrlRedirectComponent implements OnInit {

  constructor(private router: Router,
    private UrlShortenerService: UrlShortenerService,
    @Inject(DOCUMENT) private document: Document) { }

  ngOnInit(): void {
    let url : string = this.router.url;
    if(url.length === 9) {
      let longUrl = "https://www.google.com";
      // longUrl = this.UrlShortenerService.getLongUrl(url.substring(1, url.length))
      this.document.location.href = longUrl;
    } else {
      this.router.navigate(['not-found']);
    }
  }

}
