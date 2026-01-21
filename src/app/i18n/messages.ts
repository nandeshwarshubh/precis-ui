/**
 * Centralized i18n messages for the Precis URL Shortener application.
 * 
 * This file contains all user-facing strings using Angular's built-in $localize API.
 * Each message has a unique ID (@@messageId) for stable translation references.
 * 
 * Usage in components:
 *   import { MESSAGES } from '../i18n';
 *   const label = MESSAGES.common.appName;
 * 
 * Usage in templates:
 *   {{ messages.common.appName }}
 */

export const MESSAGES = {
  common: {
    appName: $localize`:@@common.appName:Precis`,
    copyright: $localize`:@@common.copyright:© 2026 Precis`,
  },

  navigation: {
    contactLink: $localize`:@@navigation.contactLink:Contact`,
  },

  landing: {
    tagline: $localize`:@@landing.tagline:Short links. Nothing else.`,
    destinationUrlLabel: $localize`:@@landing.destinationUrlLabel:Destination URL`,
    destinationUrlPlaceholder: $localize`:@@landing.destinationUrlPlaceholder:Paste your long link here...`,
    customAliasLabel: $localize`:@@landing.customAliasLabel:Custom Alias`,
    customAliasOptional: $localize`:@@landing.customAliasOptional:(Optional)`,
    customAliasPlaceholder: $localize`:@@landing.customAliasPlaceholder:my-custom-url`,
    shortenButton: $localize`:@@landing.shortenButton:Shorten`,
    shorteningButton: $localize`:@@landing.shorteningButton:Shortening...`,
    helperText: $localize`:@@landing.helperText:Press enter or click shorten to generate your link`,
    featureInstantRedirects: $localize`:@@landing.featureInstantRedirects:Instant Redirects`,
    featureHttpsSecure: $localize`:@@landing.featureHttpsSecure:HTTPS Secure`,
  },

  success: {
    headline: $localize`:@@success.headline:Shortened successfully!`,
    subheadline: $localize`:@@success.subheadline:Your secure link is ready to share.`,
    shortLinkLabel: $localize`:@@success.shortLinkLabel:Short Link`,
    originalLabel: $localize`:@@success.originalLabel:Original`,
    copyLinkButton: $localize`:@@success.copyLinkButton:Copy Link`,
    readyToPaste: $localize`:@@success.readyToPaste:Ready to paste`,
    shortenAnotherButton: $localize`:@@success.shortenAnotherButton:Shorten another link`,
  },

  error: {
    headline: $localize`:@@error.headline:Shorten your links in a second.`,
    pasteYourLongLink: $localize`:@@error.pasteYourLongLink:Paste your long link`,
    shortenUrlButton: $localize`:@@error.shortenUrlButton:Shorten URL`,
    featureLightningFast: $localize`:@@error.featureLightningFast:Lightning Fast`,
    featureLightningFastDesc: $localize`:@@error.featureLightningFastDesc:Generate secure links instantly with our optimized infrastructure.`,
    featureDetailedAnalytics: $localize`:@@error.featureDetailedAnalytics:Detailed Analytics`,
    featureDetailedAnalyticsDesc: $localize`:@@error.featureDetailedAnalyticsDesc:Track clicks, locations, and devices for every link you create.`,
    featureQrCodes: $localize`:@@error.featureQrCodes:QR Codes`,
    featureQrCodesDesc: $localize`:@@error.featureQrCodesDesc:Automatically generate QR codes for your shortened links.`,
  },

  conflict: {
    headline: $localize`:@@conflict.headline:Shorten your link.`,
    subheadline: $localize`:@@conflict.subheadline:Create short, powerful links in seconds.`,
    destinationUrlLabel: $localize`:@@conflict.destinationUrlLabel:Destination URL`,
    customAliasLabel: $localize`:@@conflict.customAliasLabel:Custom Alias`,
    shortenButton: $localize`:@@conflict.shortenButton:Shorten`,
    tryOneOfThese: $localize`:@@conflict.tryOneOfThese:Try one of these:`,
  },

  redirect: {
    redirecting: $localize`:@@redirect.redirecting:Redirecting...`,
  },

  validation: {
    urlRequired: $localize`:@@validation.urlRequired:URL is required`,
    urlInvalidFormat: $localize`:@@validation.urlInvalidFormat:Invalid URL format. Please ensure your link starts with http:// or https://`,
    urlTooLong: (maxLength: number) => $localize`:@@validation.urlTooLong:URL cannot exceed ${maxLength}:maxLength: characters`,
    aliasInvalidFormat: $localize`:@@validation.aliasInvalidFormat:Custom alias can only contain letters, numbers, hyphens, and underscores`,
    aliasLengthInvalid: (minLength: number, maxLength: number) => $localize`:@@validation.aliasLengthInvalid:Custom alias must be between ${minLength}:minLength: and ${maxLength}:maxLength: characters`,
  },

  aria: {
    clearInput: $localize`:@@aria.clearInput:Clear input`,
    errorAlert: $localize`:@@aria.errorAlert:Error`,
    successIcon: $localize`:@@aria.successIcon:Success`,
    loadingSpinner: $localize`:@@aria.loadingSpinner:Loading`,
  },
} as const;

