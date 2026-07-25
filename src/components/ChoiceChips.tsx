"use client";

type ChoiceChipsProps = {
  items: string[];
  max?: number;
  onChange: (values: string[]) => void;
  values: string[];
};

export function ChoiceChips({ items, values, onChange, max = items.length }: ChoiceChipsProps) {
  function toggle(item: string) {
    if (values.includes(item)) {
      if (max > 1) onChange(values.filter((value) => value !== item));
    } else if (max === 1) {
      onChange([item]);
    } else if (values.length < max) {
      onChange([...values, item]);
    }
  }

  return (
    <div className="flex flex-wrap gap-2.5">
      {items.map((item) => {
        const selected = values.includes(item);
        return (
          <button
            type="button"
            key={item}
            className={`min-h-[50px] cursor-pointer rounded-[14px] border px-[18px] text-[15px] font-semibold transition-colors ${
              selected
                ? "border-[var(--brand)] bg-[var(--brand-soft)] text-[var(--brand)]"
                : "border-transparent bg-[var(--surface)] text-[#5e6675] hover:bg-[#eceff3]"
            }`}
            aria-pressed={selected}
            onClick={() => toggle(item)}
          >
            {selected && "✓ "}
            {item}
          </button>
        );
      })}
    </div>
  );
}
