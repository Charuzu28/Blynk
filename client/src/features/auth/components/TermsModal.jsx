import { useEffect } from "react";

const TermsModal = ({ open, onClose }) => {
  useEffect(() => {
    if (!open) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="terms-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="max-h-[80vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-xl sm:p-8">
        <h2 id="terms-title" className="text-xl font-semibold text-slate-800">
          Terms and Conditions
        </h2>
        <div className="mt-4 space-y-4 text-sm leading-6 text-slate-500">
          <p>By using Blynk, you agree to use the service responsibly and keep your account details secure.</p>
          <p>Blynk helps you organize focus sessions, tasks, notes, and reminders. It is a productivity tool and does not provide medical advice.</p>
          <p>You are responsible for the content you add and for activity performed through your account. We may update these terms when the service changes.</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="mt-6 w-full rounded-2xl bg-blue-500 px-4 py-3 text-sm font-medium text-white transition hover:bg-blue-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default TermsModal;