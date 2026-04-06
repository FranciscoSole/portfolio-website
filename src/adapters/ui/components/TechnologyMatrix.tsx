import type { Technology } from '@/domain/entities/Technology';
import { TechnologyTag } from '@/adapters/ui/components/TechnologyTag';

interface TechnologyMatrixProps {
  readonly technologies: readonly Technology[];
}

const CATEGORY_ORDER = [
  'Backend',
  'Frontend',
  'Mobile',
  'Databases',
  'Observability',
  'Messaging',
  'DevOps',
  'Architecture and Design',
  'Documentation',
  'Methodologies',
];

function getCategoryRank(name: string): number {
  const exactIndex = CATEGORY_ORDER.findIndex((category) => category.toLowerCase() === name.toLowerCase());
  return exactIndex >= 0 ? exactIndex : CATEGORY_ORDER.length;
}

export function TechnologyMatrix({ technologies }: TechnologyMatrixProps): JSX.Element {
  const grouped = technologies.reduce<Map<string, Technology[]>>((accumulator, technology) => {
    const key = technology.category.name;
    const currentGroup = accumulator.get(key) ?? [];
    currentGroup.push(technology);
    accumulator.set(key, currentGroup);
    return accumulator;
  }, new Map());

  const orderedGroups = Array.from(grouped.entries()).sort((left, right) => {
    const rankDifference = getCategoryRank(left[0]) - getCategoryRank(right[0]);
    if (rankDifference !== 0) {
      return rankDifference;
    }
    return left[0].localeCompare(right[0]);
  });

  return (
    <div className="technology-matrix horizontal-stack-layout">
      {orderedGroups.map(([categoryName, items]) => (
        <section key={categoryName} className="surface-card technology-group inline-category-group">
          <h3>{categoryName}</h3>
          <div className="tag-row stack-wide-row">
            {items
              .sort((left, right) => left.name.localeCompare(right.name))
              .map((technology) => (
                <TechnologyTag key={technology.id} label={technology.name} />
              ))}
          </div>
        </section>
      ))}
    </div>
  );
}
