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

