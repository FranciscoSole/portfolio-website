import type { LanguageOption } from '@/domain/entities/LanguageOption';
import type { PortfolioAggregate } from '@/domain/entities/PortfolioAggregate';
import { GetLanguagesUseCase } from '@/application/use-cases/GetLanguagesUseCase';
import { GetPortfolioUseCase } from '@/application/use-cases/GetPortfolioUseCase';

export class PortfolioPageController {
  constructor(
    private readonly getLanguagesUseCase: GetLanguagesUseCase,
    private readonly getPortfolioUseCase: GetPortfolioUseCase,
  ) {}

  getLanguages(): Promise<readonly LanguageOption[]> {
    return this.getLanguagesUseCase.execute();
  }

  getPortfolio(languageCode: string): Promise<PortfolioAggregate> {
    return this.getPortfolioUseCase.execute(languageCode);
  }
}
