export interface ShortenUrlRequest {
  longUrl: string;
  customAlias?: string;
}

export interface ShortenUrlResponse {
  shortUrl: string;
  longUrl: string;
  createdAt: string;
  expiresAt: string | null;
}

export interface GetLongUrlRequest {
  shortUrl: string;
}

export interface GetLongUrlResponse {
  shortUrl: string;
  longUrl: string;
  createdAt: string;
  expiresAt: string | null;
}

export type ApiErrorCode =
  | 'VALIDATION_ERROR'
  | 'NOT_FOUND'
  | 'ALIAS_ALREADY_EXISTS'
  | 'INTERNAL_SERVER_ERROR';

export interface ApiErrorResponse {
  error: ApiErrorCode;
  message: string;
  status: number;
  timestamp: string;
}

export type UiState = 'landing' | 'success' | 'error' | 'conflict';

export interface FormState {
  longUrl: string;
  alias: string;
  shortUrl: string;
  errorMessage: string;
  conflictSuggestions: string[];
  uiState: UiState;
  isSubmitting: boolean;
}

export class UrlUtils {
  /**
   * Extracts the short code from a short URL or returns it if already a code
   * @param shortUrl - Short URL or code (e.g., "http://localhost:4200/piP7LyCL" or "piP7LyCL")
   * @returns Short code (e.g., "piP7LyCL")
   */
  static extractShortCode(shortUrl: string): string {
    if (!shortUrl) {
      return '';
    }

    // If it's already just a code (no slashes or protocol), return as-is
    if (!shortUrl.includes('/') && !shortUrl.includes(':')) {
      return shortUrl;
    }

    try {
      // Try parsing as URL
      const url = new URL(shortUrl);
      return url.pathname.substring(1); // Remove leading slash
    } catch {
      // If URL parsing fails, extract last segment after slash
      const parts = shortUrl.split('/');
      return parts[parts.length - 1];
    }
  }
}

