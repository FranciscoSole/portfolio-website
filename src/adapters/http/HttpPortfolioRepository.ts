import type { PortfolioAggregate } from '@/domain/entities/PortfolioAggregate';
import type { PortfolioRepository } from '@/domain/ports/PortfolioRepository';
import type { PortfolioResponseDto } from '@/adapters/http/dto/PortfolioResponseDto';
import { mapPortfolioResponse } from '@/adapters/http/mappers/portfolioMapper';
import { HttpClient } from '@/adapters/http/HttpClient';

export class HttpPortfolioRepository implements PortfolioRepository {
  constructor(
    private readonly client: HttpClient,
    private readonly endpointPath: string,
  ) {}

  async getPortfolio(languageCode: string): Promise<PortfolioAggregate> {
    const response = await this.client.get<PortfolioResponseDto>(this.endpointPath, {
      lang: languageCode,
    });
    return mapPortfolioResponse(response, languageCode);
  }
}
