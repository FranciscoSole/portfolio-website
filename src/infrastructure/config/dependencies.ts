import { PortfolioPageController } from '@/adapters/controllers/PortfolioPageController';
import { HttpLanguageRepository } from '@/adapters/http/HttpLanguageRepository';
import { HttpPortfolioRepository } from '@/adapters/http/HttpPortfolioRepository';
import { HttpClient } from '@/adapters/http/HttpClient';
import { GetLanguagesUseCase } from '@/application/use-cases/GetLanguagesUseCase';
import { GetPortfolioUseCase } from '@/application/use-cases/GetPortfolioUseCase';
import { environment } from '@/infrastructure/config/environment';

export function createPortfolioPageController(): PortfolioPageController {
  const client = new HttpClient(environment.apiBaseUrl);
  const languageRepository = new HttpLanguageRepository(client, environment.languagesEndpoint);
  const portfolioRepository = new HttpPortfolioRepository(client, environment.portfolioEndpoint);

  return new PortfolioPageController(
    new GetLanguagesUseCase(languageRepository),
    new GetPortfolioUseCase(portfolioRepository),
  );
}
