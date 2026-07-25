import { ChoiceChips } from "@/components/ChoiceChips";

type FormChoiceFieldProps = {
  id: string;
  label: string;
  items: string[];
  value: string;
  onChange: (value: string) => void;
};

export function FormChoiceField({ id, label, items, value, onChange }: FormChoiceFieldProps) {
  return (
    <section className="mt-[30px] [&_button]:min-w-[104px] [&_button]:flex-1" aria-labelledby={id}>
      <h2 id={id} className="mb-3 text-sm font-bold">
        {label}
      </h2>
      <ChoiceChips
        items={items}
        values={[value]}
        onChange={(values) => onChange(values[0])}
        max={1}
      />
    </section>
  );
}
