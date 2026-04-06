import type { Technology } from '@/domain/entities/Technology';

export interface Project {
  readonly id: string;
  readonly project: string;
  readonly description: string;
  readonly repositoryUrl: string | null;
  readonly technologies: readonly Technology[];
}
