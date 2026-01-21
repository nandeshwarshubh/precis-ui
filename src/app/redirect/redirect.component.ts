import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { UrlShortenerService } from '../services/url-shortener.service';
import { MESSAGES } from '../i18n';

@Component({
  selector: 'app-redirect',
  standalone: true,
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gray-50">
      <div class="text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p class="text-gray-600">{{ redirectingMessage }}</p>
      </div>
    </div>
  `,
})
export class RedirectComponent implements OnInit {
  protected readonly redirectingMessage = MESSAGES.redirect.redirecting;
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly urlShortenerService = inject(UrlShortenerService);
  private readonly platformId = inject(PLATFORM_ID);

  ngOnInit(): void {
    const shortCode = this.route.snapshot.paramMap.get('shortCode');

    console.log('RedirectComponent - shortCode:', shortCode);

    if (!shortCode) {
      console.log('No shortCode found, redirecting to home');
      this.router.navigate(['/']);
      return;
    }

    console.log('Calling API with shortUrl:', shortCode);

    // API expects just the short code, not the full URL
    this.urlShortenerService
      .getLongUrl({ shortUrl: shortCode })
      .subscribe({
        next: (response) => {
          console.log('API response:', response);
          if (isPlatformBrowser(this.platformId)) {
            console.log('Redirecting to:', response.longUrl);
            // Client-side redirect
            window.location.href = response.longUrl;
          }
        },
        error: (err) => {
          console.error('Error fetching long URL:', err);
          // If short URL not found or error, redirect to home
          this.router.navigate(['/']);
        },
      });
  }
}

