import { Component, signal, computed, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UrlShortenerService } from '../services/url-shortener.service';
import { UiState, ApiErrorResponse, UrlUtils } from '../models/api.models';
import { environment } from '../../environments/environment';
import { MESSAGES } from '../i18n';

@Component({
  selector: 'app-home',
  imports: [FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  private readonly urlShortenerService = inject(UrlShortenerService);
  private readonly platformId = inject(PLATFORM_ID);

  // Writable signals for form fields - works with ngModel in SSR
  protected longUrl = signal('');
  protected alias = signal('');
  protected readonly shortUrl = signal('');
  protected readonly errorMessage = signal('');
  protected readonly conflictSuggestions = signal<string[]>([]);
  protected readonly uiState = signal<UiState>('landing');
  protected readonly isSubmitting = signal(false);

  // Expose messages to template
  protected readonly messages = MESSAGES;

  // Computed property for UI base URL display (without protocol)
  protected readonly uiBaseUrlDisplay = computed(() => {
    const url = environment.uiBaseUrl;
    return url.replace(/^https?:\/\//, '');
  });

  protected readonly canSubmit = computed(() => {
    // No validation - button is always enabled except when submitting
    return !this.isSubmitting();
  });

  onSubmit(): void {
    if (!this.canSubmit()) {
      return;
    }

    this.isSubmitting.set(true);
    this.errorMessage.set('');
    this.conflictSuggestions.set([]);

    const trimmedAlias = this.alias().trim();
    const request = {
      longUrl: this.longUrl().trim(),
      ...(trimmedAlias && { customAlias: trimmedAlias }),
    };

    this.urlShortenerService.shortenUrl(request).subscribe({
      next: (response) => {
        // Extract short code from API response and construct UI-based URL
        const shortCode = UrlUtils.extractShortCode(response.shortUrl);
        const uiShortUrl = `${environment.uiBaseUrl}/${shortCode}`;
        this.shortUrl.set(uiShortUrl);
        this.uiState.set('success');
        this.isSubmitting.set(false);
      },
      error: (error: ApiErrorResponse) => {
        switch (error.error) {
          case 'ALIAS_ALREADY_EXISTS':
            this.handleAliasConflict(error);
            break;
          case 'VALIDATION_ERROR':
            this.handleValidationError(error);
            break;
          case 'NOT_FOUND':
          case 'INTERNAL_SERVER_ERROR':
          default:
            this.handleGenericError(error);
            break;
        }
        this.isSubmitting.set(false);
      },
    });
  }

  private handleAliasConflict(error: ApiErrorResponse): void {
    this.uiState.set('conflict');
    const baseAlias = this.alias().trim() || 'link';
    this.conflictSuggestions.set(this.urlShortenerService.generateAliasSuggestions(baseAlias));
    this.errorMessage.set(error.message);
  }

  private handleValidationError(error: ApiErrorResponse): void {
    this.uiState.set('error');
    this.errorMessage.set(error.message);
  }

  private handleGenericError(error: ApiErrorResponse): void {
    this.uiState.set('error');
    this.errorMessage.set(error.message);
  }

  protected onSuggestionClick(suggestion: string): void {
    this.alias.set(suggestion);
    this.uiState.set('landing');
    this.errorMessage.set('');
    this.conflictSuggestions.set([]);
  }

  protected onShortenAnother(): void {
    this.resetForm();
  }

  protected async onCopyLink(): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    try {
      await navigator.clipboard.writeText(this.shortUrl());
    } catch (err) {
      // Silently fail on copy error
    }
  }

  protected onClearInput(): void {
    this.longUrl.set('');
    this.resetToLanding();
  }

  private resetForm(): void {
    this.longUrl.set('');
    this.alias.set('');
    this.shortUrl.set('');
    this.errorMessage.set('');
    this.conflictSuggestions.set([]);
    this.uiState.set('landing');
    this.isSubmitting.set(false);
  }

  private resetToLanding(): void {
    this.errorMessage.set('');
    this.conflictSuggestions.set([]);
    this.uiState.set('landing');
  }
}

