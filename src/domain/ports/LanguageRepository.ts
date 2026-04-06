import type { LanguageOption } from '@/domain/entities/LanguageOption';

export interface LanguageRepository {
  getLanguages(): Promise<readonly LanguageOption[]>;
}
