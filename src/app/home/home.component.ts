import { Component, signal, computed, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UrlShortenerService } from '../services/url-shortener.service';
import { UrlValidators } from '../utils/validators';
import { UiState, ApiErrorResponse } from '../models/api.models';

@Component({
  selector: 'app-home',
  imports: [FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  private readonly urlShortenerService = inject(UrlShortenerService);
  private readonly platformId = inject(PLATFORM_ID);

  protected readonly longUrl = signal('');
  protected readonly alias = signal('');
  protected readonly shortUrl = signal('');
  protected readonly errorMessage = signal('');
  protected readonly conflictSuggestions = signal<string[]>([]);
  protected readonly uiState = signal<UiState>('landing');
  protected readonly isSubmitting = signal(false);

  protected readonly urlError = computed(() => {
    const url = this.longUrl();
    if (!url) return '';
    return UrlValidators.getUrlErrorMessage(url);
  });

  protected readonly aliasError = computed(() => {
    const aliasValue = this.alias();
    if (!aliasValue) return '';
    return UrlValidators.getCustomAliasErrorMessage(aliasValue);
  });

  protected readonly isFormValid = computed(() => {
    return this.longUrl().trim().length > 0 && !this.urlError() && !this.aliasError();
  });

  protected readonly canSubmit = computed(() => {
    return this.isFormValid() && !this.isSubmitting();
  });

  async onSubmit(): Promise<void> {
    if (!this.canSubmit()) {
      return;
    }

    this.isSubmitting.set(true);
    this.errorMessage.set('');
    this.conflictSuggestions.set([]);

    try {
      const trimmedAlias = this.alias().trim();
      const request = {
        longUrl: this.longUrl().trim(),
        ...(trimmedAlias && { customAlias: trimmedAlias }),
      };

      const response = await this.urlShortenerService.shortenUrl(request).toPromise();

      if (response?.shortUrl) {
        this.shortUrl.set(response.shortUrl);
        this.uiState.set('success');
      }
    } catch (error) {
      const apiError = error as ApiErrorResponse;

      switch (apiError.error) {
        case 'ALIAS_ALREADY_EXISTS':
          this.handleAliasConflict(apiError);
          break;
        case 'VALIDATION_ERROR':
          this.handleValidationError(apiError);
          break;
        case 'NOT_FOUND':
        case 'INTERNAL_SERVER_ERROR':
        default:
          this.handleGenericError(apiError);
          break;
      }
    } finally {
      this.isSubmitting.set(false);
    }
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
      await navigator.clipboard.writeText(`https://precis.link/${this.shortUrl()}`);
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

