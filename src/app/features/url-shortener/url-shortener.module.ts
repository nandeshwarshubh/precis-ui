import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { UrlShortenerComponent } from './url-shortener.component';
import { UrlShortenerService } from './url-shortener.service';



@NgModule({
    declarations: [
        UrlShortenerComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        ReactiveFormsModule
    ],
    providers: [UrlShortenerService],
    exports: [UrlShortenerComponent]
})
export class UrlShortenerModule { }
