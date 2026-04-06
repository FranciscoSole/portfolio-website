interface SectionHeaderProps {
  readonly title: string;
}

export function SectionHeader({ title }: SectionHeaderProps): JSX.Element {
  return (
    <header className="section-header">
      <h2>{title}</h2>
    </header>
  );
}
