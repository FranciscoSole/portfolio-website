import type { Project } from '@/domain/entities/Project';
import { TechnologyTag } from '@/adapters/ui/components/TechnologyTag';

interface ProjectsGridProps {
  readonly projects: readonly Project[];
  readonly buttonText: string;
}

export function ProjectsGrid({ projects, buttonText }: ProjectsGridProps): JSX.Element {
  return (
    <div className="project-grid">
      {projects.map((project) => (
        <article key={project.id} className="surface-card project-card">
          <div className="project-header-row">
            <h3>{project.project}</h3>
            {project.repositoryUrl ? (
              <a href={project.repositoryUrl} target="_blank" rel="noreferrer" className="repository-link">
                <span>{buttonText}</span>
                <span aria-hidden="true">↗</span>
              </a>
            ) : null}
          </div>
          <p>{project.description}</p>
          {project.technologies.length > 0 ? (
            <div className="tag-row">
              {project.technologies.map((technology) => (
                <TechnologyTag key={`${project.id}-${technology.id}`} label={technology.name} />
              ))}
            </div>
          ) : null}
        </article>
      ))}
    </div>
  );
}
