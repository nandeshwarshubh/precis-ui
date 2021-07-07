import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UrlShortenerService } from './url-shortener.service';

@Component({
  selector: 'url-shortener',
  templateUrl: './url-shortener.component.html'
})
export class UrlShortenerComponent implements OnInit {

  urlForm: FormGroup;
  shortUrl: string;

  constructor(private urlShortenerService: UrlShortenerService) { }

  ngOnInit(): void {
    const reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
    this.urlForm = new FormGroup({
      longUrl: new FormControl('', [Validators.required, Validators.pattern(reg)])
    });
  }

  onSubmit(form: FormGroup) {
    // this.urlShortenerService.createShortUrl(form.value.longUrl).subscribe(data => {
    //   this.shortUrl = data;
    // }, err => {
    //   console.log(err);
    // });

    this.shortUrl = "http://localhost:4200/GRNHv-Vd"
  }

}
