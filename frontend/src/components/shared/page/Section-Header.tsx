type Props = {
  title: string;
  description?: string;
};

export default function SectionHeader({ title, description }: Props) {
  return (
    <div className="w-full flex flex-col items-start gap-1">
      <h1 className="font-semibold text-lg">{title}</h1>
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
    </div>
  );
}
