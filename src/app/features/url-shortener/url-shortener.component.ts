import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UrlShortenerService } from './url-shortener.service';
import { ValidatorFn, AbstractControl } from '@angular/forms';

@Component({
  selector: 'url-shortener',
  templateUrl: './url-shortener.component.html'
})
export class UrlShortenerComponent implements OnInit {

  urlForm: FormGroup;
  shortUrl: string;

  constructor(private urlShortenerService: UrlShortenerService) { }

  ngOnInit(): void {
    let urlValidator : ValidatorFn = (control: AbstractControl) => {
      let validUrl = true;
      try {
        new URL(control.value)
      } catch {
        validUrl = false;
      }
  
      return validUrl ? null : { invalidUrl: true };
    }
    this.urlForm = new FormGroup({
      longUrl: new FormControl('', [Validators.required, urlValidator])
    });
  }

  onSubmit(form: FormGroup) {
    this.urlShortenerService.createShortUrl(form.value.longUrl).subscribe(data => {
      this.shortUrl = data.shortUrl;
    }, err => {
      console.log(err);
    });
  }

}
