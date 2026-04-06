interface ErrorStateProps {
  readonly message: string;
  readonly onRetry: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps): JSX.Element {
  return (
    <div className="feedback-state feedback-error" role="alert">
      <p>{message}</p>
      <button type="button" className="action-button" onClick={onRetry}>
        Reintentar
      </button>
    </div>
  );
}
