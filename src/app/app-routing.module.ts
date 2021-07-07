import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './features/not-found/not-found.component';
import { UrlRedirectComponent } from './features/url-redirect/url-redirect.component';
import { UrlShortenerComponent } from './features/url-shortener/url-shortener.component';

const routes: Routes = [
  { path: '', redirectTo: 'shortener', pathMatch: "full" },
  { path: 'shortener', component: UrlShortenerComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', component: UrlRedirectComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
