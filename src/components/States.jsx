export const Loader = () => <div className="spin" role="status" aria-label="Loading" />;

export function ErrorMessage({ message, onRetry }) {
  return (
    <div className="err-box" role="alert">
      <p>{message}</p>
      {onRetry && <button onClick={onRetry}>Try again</button>}
    </div>
  );
}
