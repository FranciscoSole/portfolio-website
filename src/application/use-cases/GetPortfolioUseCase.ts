import type { PortfolioAggregate } from '@/domain/entities/PortfolioAggregate';
import type { PortfolioRepository } from '@/domain/ports/PortfolioRepository';

export class GetPortfolioUseCase {
  constructor(private readonly repository: PortfolioRepository) {}

  execute(languageCode: string): Promise<PortfolioAggregate> {
    return this.repository.getPortfolio(languageCode);
  }
}
