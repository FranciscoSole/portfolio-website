import type { JobHighlight } from '@/domain/entities/JobHighlight';
import type { Technology } from '@/domain/entities/Technology';

export interface Job {
  readonly id: string;
  readonly companyName: string;
  readonly location: string;
  readonly position: string;
  readonly startDate: string;
  readonly endDate: string | null;
  readonly description: string;
  readonly highlights: readonly JobHighlight[];
  readonly technologies: readonly Technology[];
}
