type QuestionSectionProps = {
  title: string;
  description: string;
  children: React.ReactNode;
};

export function QuestionSection({ title, description, children }: QuestionSectionProps) {
  return (
    <section>
      <h1>{title}</h1>
      <p className="muted">{description}</p>
      <div className="mt-10">{children}</div>
    </section>
  );
}
