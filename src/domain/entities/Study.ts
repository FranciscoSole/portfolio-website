export interface Study {
  readonly id: string;
  readonly organizationName: string;
  readonly title: string;
  readonly startDate: string;
  readonly endDate: string | null;
}
