import { MESSAGES } from '../i18n';

export class UrlValidators {
  private static readonly URL_PATTERN =
    /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;
  private static readonly CUSTOM_ALIAS_PATTERN = /^[a-zA-Z0-9_-]*$/;
  private static readonly MAX_URL_LENGTH = 2048;
  private static readonly MIN_ALIAS_LENGTH = 3;
  private static readonly MAX_ALIAS_LENGTH = 8;

  static isValidUrl(url: string): boolean {
    if (!url || url.trim().length === 0) {
      return false;
    }
    const trimmedUrl = url.trim();
    if (trimmedUrl.length > this.MAX_URL_LENGTH) {
      return false;
    }
    return this.URL_PATTERN.test(trimmedUrl);
  }

  static isValidCustomAlias(alias: string): boolean {
    if (!alias || alias.trim().length === 0) {
      return true;
    }
    const trimmedAlias = alias.trim();
    if (
      trimmedAlias.length < this.MIN_ALIAS_LENGTH ||
      trimmedAlias.length > this.MAX_ALIAS_LENGTH
    ) {
      return false;
    }
    return this.CUSTOM_ALIAS_PATTERN.test(trimmedAlias);
  }

  static getUrlErrorMessage(url: string): string {
    if (!url || url.trim().length === 0) {
      return MESSAGES.validation.urlRequired;
    }
    const trimmedUrl = url.trim();
    if (trimmedUrl.length > this.MAX_URL_LENGTH) {
      return MESSAGES.validation.urlTooLong(this.MAX_URL_LENGTH);
    }
    if (!this.URL_PATTERN.test(trimmedUrl)) {
      return MESSAGES.validation.urlInvalidFormat;
    }
    return '';
  }

  static getCustomAliasErrorMessage(alias: string): string {
    if (!alias || alias.trim().length === 0) {
      return '';
    }
    const trimmedAlias = alias.trim();
    if (
      trimmedAlias.length < this.MIN_ALIAS_LENGTH ||
      trimmedAlias.length > this.MAX_ALIAS_LENGTH
    ) {
      return MESSAGES.validation.aliasLengthInvalid(this.MIN_ALIAS_LENGTH, this.MAX_ALIAS_LENGTH);
    }
    if (!this.CUSTOM_ALIAS_PATTERN.test(trimmedAlias)) {
      return MESSAGES.validation.aliasInvalidFormat;
    }
    return '';
  }
}

