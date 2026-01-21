import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import {
  ShortenUrlRequest,
  ShortenUrlResponse,
  GetLongUrlRequest,
  GetLongUrlResponse,
  ApiErrorResponse,
} from '../models/api.models';

@Injectable({
  providedIn: 'root',
})
export class UrlShortenerService {
  private readonly apiBaseUrl = environment.apiBaseUrl;

  constructor(private readonly http: HttpClient) {}

  shortenUrl(request: ShortenUrlRequest): Observable<ShortenUrlResponse> {
    const headers = this.getHeaders();
    return this.http
      .post<ShortenUrlResponse>(`${this.apiBaseUrl}/shorten`, request, { headers })
      .pipe(catchError((error) => this.handleError(error)));
  }

  getLongUrl(request: GetLongUrlRequest): Observable<GetLongUrlResponse> {
    const headers = this.getHeaders();
    return this.http
      .post<GetLongUrlResponse>(`${this.apiBaseUrl}/long`, request, { headers })
      .pipe(catchError((error) => this.handleError(error)));
  }

  generateAliasSuggestions(baseAlias: string): string[] {
    const currentYear = new Date().getFullYear().toString().slice(-2);
    return [`${baseAlias}-${currentYear}`, `${baseAlias}-v2`, `get-${baseAlias}`];
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let apiError: ApiErrorResponse;

    if (error.error && typeof error.error === 'object' && 'error' in error.error) {
      apiError = error.error as ApiErrorResponse;
    } else {
      apiError = {
        error: this.mapStatusToErrorCode(error.status),
        message: this.getErrorMessage(error),
        status: error.status,
        timestamp: new Date().toISOString(),
      };
    }

    return throwError(() => apiError);
  }

  private mapStatusToErrorCode(status: number): ApiErrorResponse['error'] {
    switch (status) {
      case 400:
        return 'VALIDATION_ERROR';
      case 404:
        return 'NOT_FOUND';
      case 409:
        return 'ALIAS_ALREADY_EXISTS';
      case 500:
        return 'INTERNAL_SERVER_ERROR';
      default:
        return 'INTERNAL_SERVER_ERROR';
    }
  }

  private getErrorMessage(error: HttpErrorResponse): string {
    if (error.error?.message) {
      return error.error.message;
    }

    if (error.status === 0) {
      return 'Unable to connect to the server. Please check your internet connection.';
    }

    switch (error.status) {
      case 400:
        return 'Invalid request. Please check your input and try again.';
      case 404:
        return 'The requested short URL was not found.';
      case 409:
        return 'This custom alias is already taken. Please choose another.';
      case 500:
        return 'An unexpected server error occurred. Please try again later.';
      default:
        return 'An unexpected error occurred. Please try again.';
    }
  }
}

