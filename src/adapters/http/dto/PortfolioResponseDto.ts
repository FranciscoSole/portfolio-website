export interface LanguagesResponseDto {
  readonly items: readonly LanguageItemDto[];
}

export interface LanguageItemDto {
  readonly code: string;
  readonly language: string;
}

export interface CategoryResponseDto {
  readonly id?: number | string;
  readonly category?: string;
  readonly name?: string;
}

export interface TechnologyResponseDto {
  readonly id?: number | string;
  readonly technology?: string;
  readonly name?: string;
  readonly category_id?: number | string;
  readonly category?: CategoryResponseDto | string;
}

export interface JobHighlightResponseDto {
  readonly id?: number | string;
  readonly type?: number | string;
  readonly item_information?: string;
  readonly itemInformation?: string;
}

export interface JobResponseDto {
  readonly id?: number | string;
  readonly company_name?: string;
  readonly companyName?: string;
  readonly location?: string;
  readonly position?: string;
  readonly start_date?: string;
  readonly startDate?: string;
  readonly end_date?: string | null;
  readonly endDate?: string | null;
  readonly description?: string;
  readonly highlights?: readonly JobHighlightResponseDto[];
  readonly technologies?: readonly TechnologyResponseDto[];
}

export interface StudyResponseDto {
  readonly id?: number | string;
  readonly organization_name?: string;
  readonly organizationName?: string;
  readonly title?: string;
  readonly start_date?: string;
  readonly startDate?: string;
  readonly end_date?: string | null;
  readonly endDate?: string | null;
}

export interface ProjectResponseDto {
  readonly id?: number | string;
  readonly project?: string;
  readonly description?: string;
  readonly repository_url?: string | null;
  readonly repositoryUrl?: string | null;
  readonly technologies?: readonly TechnologyResponseDto[];
}

export interface CertificationResponseDto {
  readonly id?: number | string;
  readonly certification?: string;
  readonly issuer?: string;
  readonly issue_date?: string;
  readonly issueDate?: string;
  readonly credential_id?: string | null;
  readonly credentialId?: string | null;
  readonly credential_url?: string | null;
  readonly credentialUrl?: string | null;
}

export interface PortfolioResponseDto {
  readonly language_code?: string;
  readonly languageCode?: string;
  readonly categories?: readonly CategoryResponseDto[];
  readonly technologies?: readonly TechnologyResponseDto[];
  readonly jobs?: readonly JobResponseDto[];
  readonly studies?: readonly StudyResponseDto[];
  readonly projects?: readonly ProjectResponseDto[];
  readonly certifications?: readonly CertificationResponseDto[];
}
