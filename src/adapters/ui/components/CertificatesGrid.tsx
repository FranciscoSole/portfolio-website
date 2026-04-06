import type { Certification } from '@/domain/entities/Certification';

interface CertificatesGridProps {
  readonly certifications: readonly Certification[];
  readonly buttonText: string;
  readonly formatDateStructure: string;
}

function getIssuerMark(issuer: string): string {
  return issuer
    .split(' ')
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

function formatDate(date: string, formatDateStructure:string): string {
  let format: string;

  if (formatDateStructure === 'ENG') {
    format = 'en-US';
  } else{
    format = 'es-AR';
  }

  return new Intl.DateTimeFormat(format, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(date));
}

export function CertificatesGrid({ certifications, buttonText, formatDateStructure }: CertificatesGridProps): JSX.Element {
  return (
    <div className="certificate-grid">
      {certifications.map((certification) => (
        <article key={certification.id} className="surface-card certificate-card">
          <div className="certificate-main">
            <div className="certificate-logo" aria-hidden="true">
              {getIssuerMark(certification.issuer)}
            </div>
            <div className="certificate-copy">
              <strong>{certification.certification}</strong>
              <span>{certification.issuer}</span>
              <time>{formatDate(certification.issueDate, formatDateStructure)}</time>
            </div>
          </div>
          {certification.credentialUrl ? (
            <a href={certification.credentialUrl} target="_blank" rel="noreferrer" className="repository-link">
              {buttonText}
            </a>
          ) : null}
        </article>
      ))}
    </div>
  );
}
