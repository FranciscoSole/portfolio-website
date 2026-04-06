import type { Certification } from '@/domain/entities/Certification';
import type { Job } from '@/domain/entities/Job';
import type { LanguageOption } from '@/domain/entities/LanguageOption';
import type { PortfolioAggregate } from '@/domain/entities/PortfolioAggregate';
import type { Project } from '@/domain/entities/Project';
import type { Study } from '@/domain/entities/Study';
import type { Technology } from '@/domain/entities/Technology';
import type {
  CertificationResponseDto,
  JobHighlightResponseDto,
  JobResponseDto,
  LanguagesResponseDto,
  PortfolioResponseDto,
  ProjectResponseDto,
  StudyResponseDto,
  TechnologyResponseDto,
} from '@/adapters/http/dto/PortfolioResponseDto';

function toArray<T>(value: readonly T[] | undefined | null): readonly T[] {
  return Array.isArray(value) ? value : [];
}

function normalizeId(...parts: Array<string | number | null | undefined>): string {
  return parts
    .filter((part) => part !== null && part !== undefined && String(part).trim() !== '')
    .map((part) => String(part))
    .join('-');
}

function resolveText(...values: Array<string | null | undefined>): string {
  return values.find((value) => typeof value === 'string' && value.trim().length > 0)?.trim() ?? '';
}

function mapTechnology(dto: TechnologyResponseDto, fallbackIndex: number): Technology {
  const categoryValue = dto.category;
  const categoryName =
    typeof categoryValue === 'string'
      ? categoryValue
      : resolveText(categoryValue?.category, categoryValue?.name, 'General');

  const technologyName = resolveText(dto.technology, dto.name, 'Tecnología');

  return {
    id: normalizeId(dto.id, technologyName, categoryName, fallbackIndex),
    name: technologyName,
    category: {
      name: categoryName,
    },
  };
}

function mapTechnologyList(technologies: readonly TechnologyResponseDto[] | undefined): readonly Technology[] {
  return toArray(technologies).map((technology, index) => mapTechnology(technology, index));
}

function mapJobHighlight(dto: JobHighlightResponseDto, fallbackIndex: number): Job['highlights'][number] {
  const itemInformation = resolveText(dto.item_information, dto.itemInformation);
  const typeValue = dto.type;

  return {
    id: normalizeId(dto.id, typeValue, fallbackIndex),
    type: typeof typeValue === 'string' ? typeValue : String(typeValue ?? ''),
    itemInformation,
  };
}

function mapJob(job: JobResponseDto, fallbackIndex: number): Job {
  const companyName = resolveText(job.company_name, job.companyName, 'Empresa');
  const position = resolveText(job.position, 'Rol');
  const startDate = resolveText(job.start_date, job.startDate);

  return {
    id: normalizeId(job.id, companyName, fallbackIndex),
    companyName,
    location: resolveText(job.location),
    position,
    startDate,
    endDate: job.end_date ?? job.endDate ?? null,
    description: resolveText(job.description),
    highlights: toArray(job.highlights)
      .map((highlight, index) => mapJobHighlight(highlight, index))
      .filter((highlight) => highlight.itemInformation.length > 0),
    technologies: mapTechnologyList(job.technologies),
  };
}

function mapStudy(study: StudyResponseDto, fallbackIndex: number): Study {
  const organizationName = resolveText(study.organization_name, study.organizationName, 'Institución');
  const title = resolveText(study.title, 'Estudio');

  return {
    id: normalizeId(study.id, organizationName, title, fallbackIndex),
    organizationName,
    title,
    startDate: resolveText(study.start_date, study.startDate),
    endDate: study.end_date ?? study.endDate ?? null,
  };
}

function mapProject(project: ProjectResponseDto, fallbackIndex: number): Project {
  const projectName = resolveText(project.project, 'Proyecto');

  return {
    id: normalizeId(project.id, projectName, fallbackIndex),
    project: projectName,
    description: resolveText(project.description),
    repositoryUrl: project.repository_url ?? project.repositoryUrl ?? null,
    technologies: mapTechnologyList(project.technologies),
  };
}

function mapCertification(dto: CertificationResponseDto, fallbackIndex: number): Certification {
  const certificationName = resolveText(dto.certification, 'Certificación');
  const issuer = resolveText(dto.issuer, 'Emisor');

  return {
    id: normalizeId(dto.id, certificationName, issuer, fallbackIndex),
    certification: certificationName,
    issuer,
    issueDate: resolveText(dto.issue_date, dto.issueDate),
    credentialId: dto.credential_id ?? dto.credentialId ?? null,
    credentialUrl: dto.credential_url ?? dto.credentialUrl ?? null,
  };
}

function collectTechnologies(
  rootTechnologies: readonly TechnologyResponseDto[] | undefined,
  jobs: readonly Job[],
  projects: readonly Project[],
): readonly Technology[] {
  const collected = [...mapTechnologyList(rootTechnologies), ...jobs.flatMap((job) => job.technologies), ...projects.flatMap((project) => project.technologies)];

  const unique = new Map<string, Technology>();

  collected.forEach((technology) => {
    const key = `${technology.category.name.toLowerCase()}::${technology.name.toLowerCase()}`;
    if (!unique.has(key)) {
      unique.set(key, technology);
    }
  });

  return Array.from(unique.values());
}

export function mapPortfolioResponse(response: PortfolioResponseDto, languageCode: string): PortfolioAggregate {
  const jobs = toArray(response.jobs).map((job, index) => mapJob(job, index));
  const projects = toArray(response.projects).map((project, index) => mapProject(project, index));
  const studies = toArray(response.studies).map((study, index) => mapStudy(study, index));
  const certifications = toArray(response.certifications).map((certification, index) => mapCertification(certification, index));

  return {
    languageCode: resolveText(response.language_code, response.languageCode, languageCode),
    jobs,
    studies,
    projects,
    certifications,
    technologies: collectTechnologies(response.technologies, jobs, projects),
  };
}

export function mapLanguageOptions(response: LanguagesResponseDto): readonly LanguageOption[] {
  return response.items.map((item) => ({
    code: item.code,
    language: item.language,
  }));
}
