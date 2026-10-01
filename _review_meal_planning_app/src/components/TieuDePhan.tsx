export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: string
  description: string
}) {
  return (
    <div>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-2 max-w-3xl text-3xl font-black leading-tight tracking-tight md:text-5xl">
        {title}
      </h2>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-stone-600 md:text-base">
        {description}
      </p>
    </div>
  )
}
