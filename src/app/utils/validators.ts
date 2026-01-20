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
      return 'URL is required';
    }
    const trimmedUrl = url.trim();
    if (trimmedUrl.length > this.MAX_URL_LENGTH) {
      return `URL cannot exceed ${this.MAX_URL_LENGTH} characters`;
    }
    if (!this.URL_PATTERN.test(trimmedUrl)) {
      return 'Invalid URL format. Please ensure your link starts with http:// or https://';
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
      return `Custom alias must be between ${this.MIN_ALIAS_LENGTH} and ${this.MAX_ALIAS_LENGTH} characters`;
    }
    if (!this.CUSTOM_ALIAS_PATTERN.test(trimmedAlias)) {
      return 'Custom alias can only contain letters, numbers, hyphens, and underscores';
    }
    return '';
  }
}

