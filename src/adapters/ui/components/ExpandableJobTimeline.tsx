import { useEffect, useMemo, useRef, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import type { Job } from '@/domain/entities/Job';
import { TechnologyTag } from '@/adapters/ui/components/TechnologyTag';

interface ExpandableJobTimelineProps {
  readonly jobs: readonly Job[];
  readonly formatDateStructure: string;
}

function formatPeriod(startDate: string, endDate: string | null, formatDateStructure: string): string {
  let format: string;
  let end: string;

  if (formatDateStructure === 'ENG') {
    format = 'en-US';
    end = 'Present';
  } else {
    format = 'es-AR';
    end = 'Actualidad';
  }

  const formatter = new Intl.DateTimeFormat(format, {
    year: 'numeric',
    month: 'short',
  });

  const start = formatter.format(new Date(startDate));

  if (!endDate) {
    return `${start} — ${end}`;
  }

  return `${start} — ${formatter.format(new Date(endDate))}`;
}

interface ExpandablePanelProps {
  readonly isOpen: boolean;
  readonly children: ReactNode;
}

function ExpandablePanel({ isOpen, children }: ExpandablePanelProps): JSX.Element {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const element = contentRef.current;

    if (!element) {
      return undefined;
    }

    const updateHeight = () => setHeight(element.scrollHeight);
    updateHeight();

    const observer = new ResizeObserver(updateHeight);
    observer.observe(element);

    return () => observer.disconnect();
  }, [children]);

  const style = {
    '--panel-height': `${isOpen ? height : 0}px`,
  } as CSSProperties;

  return (
    <div className={`timeline-panel-wrap ${isOpen ? 'is-open' : ''}`} style={style} aria-hidden={!isOpen}>
      <div ref={contentRef} className="timeline-panel">
        {children}
      </div>
    </div>
  );
}

export function ExpandableJobTimeline({ jobs, formatDateStructure }: ExpandableJobTimelineProps): JSX.Element {
  const sortedJobs = useMemo(
    () => [...jobs].sort((left, right) => +new Date(right.startDate) - +new Date(left.startDate)),
    [jobs],
  );

  const [openJobId, setOpenJobId] = useState<string | null>(sortedJobs[0]?.id ?? null);

  useEffect(() => {
    setOpenJobId(sortedJobs[0]?.id ?? null);
  }, [sortedJobs]);

  return (
    <div className="job-timeline">
      {sortedJobs.map((job) => {
        const isOpen = openJobId === job.id;
        
        return (
          <article key={job.id} className={`timeline-item ${isOpen ? 'is-open' : ''}`}>
            <div className="timeline-rail" aria-hidden="true">
              <span className="timeline-dot" />
            </div>

            <div className="timeline-body">
              <button type="button" className="timeline-trigger" onClick={() => setOpenJobId(isOpen ? null : job.id)}>
                <div className="timeline-copy">
                  <div className="timeline-heading-row">
                    <div className="timeline-heading-main">
                      <h3>{job.companyName}</h3>
                      <p className="timeline-role">
                        {job.position}
                        {job.location ? ` · ${job.location}` : ''}
                      </p>
                    </div>
                    <span className="timeline-period">{formatPeriod(job.startDate, job.endDate, formatDateStructure)}</span>
                  </div>
                </div>
                <span className="timeline-toggle" aria-hidden="true">
                  <span>{isOpen ? '−' : '+'}</span>
                </span>
              </button>

              <ExpandablePanel isOpen={isOpen}>
                {job.highlights.length > 0 ? (
                  <ul>
                    {job.highlights.map((highlight) => (
                      <li key={highlight.id}>{highlight.itemInformation}</li>
                    ))}
                  </ul>
                ) : null}
                {job.technologies.length > 0 ? (
                  <div className="tag-row">
                    {job.technologies.map((technology) => (
                      <TechnologyTag key={`${job.id}-${technology.id}`} label={technology.name} />
                    ))}
                  </div>
                ) : null}
              </ExpandablePanel>
            </div>
          </article>
        );
      })}
    </div>
  );
}
