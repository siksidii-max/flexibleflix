import { IconCheck } from "./icons";

export type ToastMessage = {
  id: number;
  message: string;
};

type ToastProps = {
  toast: ToastMessage | null;
};

export function Toast({ toast }: ToastProps) {
  return (
    <div
      className="toast-region"
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      {toast ? (
        <div className="toast" key={toast.id}>
          <span className="toast__icon" aria-hidden="true">
            <IconCheck />
          </span>
          <span className="toast__text">{toast.message}</span>
        </div>
      ) : null}
    </div>
  );
}
