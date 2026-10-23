type Props = {
  title: string;
  description: string;
};

export default function PageHeading({ title, description }: Props) {
  return (
    <div className="flex flex-col">
      <div className="text-2xl font-bold">{title}</div>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  );
}
