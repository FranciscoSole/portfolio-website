import type { LanguageOption } from '@/domain/entities/LanguageOption';
import type { LanguageRepository } from '@/domain/ports/LanguageRepository';

export class GetLanguagesUseCase {
  constructor(private readonly repository: LanguageRepository) {}

  execute(): Promise<readonly LanguageOption[]> {
    return this.repository.getLanguages();
  }
}
