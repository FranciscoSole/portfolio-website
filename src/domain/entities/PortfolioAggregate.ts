import type { Certification } from '@/domain/entities/Certification';
import type { Job } from '@/domain/entities/Job';
import type { Project } from '@/domain/entities/Project';
import type { Study } from '@/domain/entities/Study';
import type { Technology } from '@/domain/entities/Technology';

export interface PortfolioAggregate {
  readonly languageCode: string;
  readonly jobs: readonly Job[];
  readonly studies: readonly Study[];
  readonly projects: readonly Project[];
  readonly technologies: readonly Technology[];
  readonly certifications: readonly Certification[];
}
