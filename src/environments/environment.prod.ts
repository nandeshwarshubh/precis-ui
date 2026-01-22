export const environment = {
  production: true,
  apiBaseUrl:  process.env['NG_APP_API_BASE_URL'] || 'http://localhost:8080/app/rest',
  uiBaseUrl:  process.env['NG_APP_UI_BASE_URL'] || 'http://localhost:4000',
};

