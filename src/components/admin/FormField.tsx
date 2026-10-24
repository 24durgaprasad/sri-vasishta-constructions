interface FormFieldProps {
  label: string;
  error?: string;
  children: React.ReactNode;
  hint?: string;
  required?: boolean;
}

export function FormField({ label, error, children, hint, required }: FormFieldProps) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-navy-700">
        {label}
        {required && <span className="text-brand-500 ml-1">*</span>}
      </label>
      {children}
      {hint && <p className="text-xs text-navy-400">{hint}</p>}
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}

// Re-usable input className helper
export const inputCls =
  "w-full rounded-lg border border-navy-200 px-3 py-2 text-sm text-navy-800 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent bg-white";
export const selectCls = inputCls;
export const textareaCls = `${inputCls} resize-none`;
