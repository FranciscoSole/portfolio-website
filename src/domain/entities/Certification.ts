export interface Certification {
  readonly id: string;
  readonly certification: string;
  readonly issuer: string;
  readonly issueDate: string;
  readonly credentialId: string | null;
  readonly credentialUrl: string | null;
}
