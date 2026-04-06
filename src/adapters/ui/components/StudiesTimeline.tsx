import type { Study } from '@/domain/entities/Study';

interface StudiesTimelineProps {
  readonly studies: readonly Study[];
}

function formatDateLabel(value: string | null): string {
  if (!value) {
    return 'Actualidad';
  }

  return new Intl.DateTimeFormat('es-AR', {
    year: 'numeric',
    month: 'short',
  }).format(new Date(value));
}

export function StudiesTimeline({ studies }: StudiesTimelineProps): JSX.Element {
  const sortedStudies = [...studies].sort((left, right) => +new Date(right.startDate) - +new Date(left.startDate));

  return (
    <div className="study-timeline">
      {sortedStudies.map((study) => (
        <article key={study.id} className="study-item surface-card">
          <div className="study-heading-row">
            <div className="study-copy">
              <p>{study.organizationName}</p>
              <h3>{study.title}</h3>
            </div>
            <span className="timeline-period">
              {formatDateLabel(study.startDate)} — {formatDateLabel(study.endDate)}
            </span>
          </div>
        </article>
      ))}
    </div>
  );
}
