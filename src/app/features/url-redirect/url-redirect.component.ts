import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    let url: string = this.router.url;
    if (url.length === 9) {
      this.UrlShortenerService.getLongUrl(url.substring(1, url.length)).subscribe(data => {
        this.document.location.href = data.longUrl;
      }, err => {
        if (err && err.error && err.error.errorCode === "NOT_FOUND") {
          this.router.navigate(['not-found']);
        }
        console.log(err);
      })
    } else {
      this.router.navigate(['not-found']);
    }
  }

}
