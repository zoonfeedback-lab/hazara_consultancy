"use client";

type RepeatableInputListProps = {
  addLabel: string;
  label: string;
  onChange: (items: string[]) => void;
  placeholder: string;
  values: string[];
};

export function RepeatableInputList({
  addLabel,
  label,
  onChange,
  placeholder,
  values,
}: RepeatableInputListProps) {
  const updateValue = (index: number, nextValue: string) => {
    onChange(values.map((value, currentIndex) => (currentIndex === index ? nextValue : value)));
  };

  const removeValue = (index: number) => {
    onChange(values.filter((_, currentIndex) => currentIndex !== index));
  };

  return (
    <div className="space-y-3">
      <div className="text-sm font-medium text-[#1F2937]">{label}</div>
      {values.map((value, index) => (
        <div key={`${label}-${index}`} className="flex gap-3">
          <input
            className="admin-input"
            value={value}
            placeholder={placeholder}
            onChange={(event) => updateValue(index, event.target.value)}
          />
          <button
            type="button"
            className="admin-button-secondary shrink-0"
            onClick={() => removeValue(index)}
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        className="admin-button-secondary"
        onClick={() => onChange([...values, ""])}
      >
        {addLabel}
      </button>
    </div>
  );
}
