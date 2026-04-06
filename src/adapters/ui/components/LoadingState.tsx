interface LoadingStateProps {
  readonly label: string;
}

export function LoadingState({ label }: LoadingStateProps): JSX.Element {
  return (
    <div className="feedback-state" role="status" aria-live="polite">
      <div className="spinner" aria-hidden="true" />
      <p>{label}</p>
    </div>
  );
}
