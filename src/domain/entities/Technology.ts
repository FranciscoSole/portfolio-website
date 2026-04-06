import type { TechnologyCategory } from '@/domain/entities/TechnologyCategory';

export interface Technology {
  readonly id: string;
  readonly name: string;
  readonly category: TechnologyCategory;
}
