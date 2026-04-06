import type { LanguageOption } from '@/domain/entities/LanguageOption';
import type { LanguageRepository } from '@/domain/ports/LanguageRepository';
import type { LanguagesResponseDto } from '@/adapters/http/dto/PortfolioResponseDto';
import { mapLanguageOptions } from '@/adapters/http/mappers/portfolioMapper';
import { HttpClient } from '@/adapters/http/HttpClient';

export class HttpLanguageRepository implements LanguageRepository {
  constructor(
    private readonly client: HttpClient,
    private readonly endpointPath: string,
  ) {}

  async getLanguages(): Promise<readonly LanguageOption[]> {
    const response = await this.client.get<LanguagesResponseDto>(this.endpointPath);
    return mapLanguageOptions(response);
  }
}
