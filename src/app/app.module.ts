import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UrlRedirectComponent } from './features/url-redirect/url-redirect.component';
import { UrlShortenerModule } from './features/url-shortener/url-shortener.module';
import { NotFoundComponent } from './features/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    UrlRedirectComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    UrlShortenerModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
