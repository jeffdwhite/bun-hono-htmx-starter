// FORM INPUT BOX
interface InputProps {
  name: string;
  type?: "text" | "email" | "password" | "search" | "url" | "tel" | "number";
  label?: string;
  placeholder?: string;
  value?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  class?: string;
  [key: string]: unknown;
}

export function Input({
  name,
  type = "text",
  label,
  placeholder,
  value,
  required = false,
  disabled = false,
  error,
  class: className = "",
  ...props
}: InputProps) {
  const inputClasses = ["input", error ? "input-error" : "", className]
    .filter(Boolean)
    .join(" ");

  return (
    <div class="form-group">
      {label && (
        <label for={name} class="label">
          {label}
          {required && <span class="required">*</span>}
        </label>
      )}
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        required={required}
        disabled={disabled}
        class={inputClasses}
        {...props}
      />
      {error && <span class="error-text">{error}</span>}
    </div>
  );
}

// FROM TEXTAREA BOX
interface TextareaProps {
  name: string;
  rows?: number;
  label?: string;
  placeholder?: string;
  value?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  class?: string;
  [key: string]: unknown;
}

export function Textarea({
  name,
  rows = 4,
  label,
  placeholder,
  value,
  required = false,
  disabled = false,
  error,
  class: className = "",
  ...props
}: TextareaProps) {
  const textareaClasses = ["textarea", error ? "textarea-error" : "", className]
    .filter(Boolean)
    .join(" ");

  return (
    <div class="form-group">
      {label && (
        <label for={name} class="label">
          {label}
          {required && <span class="required">*</span>}
        </label>
      )}
      <textarea
        id={name}
        name={name}
        rows={rows}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        class={textareaClasses}
        {...props}
      >
        {value}
      </textarea>
      {error && <span class="error-text">{error}</span>}
    </div>
  );
}
