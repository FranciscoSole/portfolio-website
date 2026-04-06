export const environment = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000',
  portfolioEndpoint: import.meta.env.VITE_PORTFOLIO_ENDPOINT ?? '/portfolio',
  languagesEndpoint: import.meta.env.VITE_LANGUAGES_ENDPOINT ?? '/languages',
};
