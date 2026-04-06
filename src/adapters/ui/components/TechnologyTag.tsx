interface TechnologyTagProps {
  readonly label: string;
}

export function TechnologyTag({ label }: TechnologyTagProps): JSX.Element {
  return <span className="technology-tag">{label}</span>;
}
