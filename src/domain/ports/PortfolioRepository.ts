import type { PortfolioAggregate } from '@/domain/entities/PortfolioAggregate';

export interface PortfolioRepository {
  getPortfolio(languageCode: string): Promise<PortfolioAggregate>;
}
