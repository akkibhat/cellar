
/**
 * The shared header for the standalone tool pages, so they open the same
 * way a chapter does and the site reads as one document.
 */
export default function PageHeader({
  eyebrow,
  title,
  standfirst,
}: {
  eyebrow?: string;
  title: string;
  standfirst: string;
}) {
  return (
    <header className="mb-8">
      {eyebrow && <p className="label-ui mb-2">{eyebrow}</p>}
      <h1 className="hand t-h1 sm:t-display leading-[1.02] mb-1">
        {title}
      </h1>
      <p
        className="t-lead italic leading-relaxed mt-5 max-w-[34rem]"
        style={{ color: 'var(--ink-soft)' }}
      >
        {standfirst}
      </p>
    </header>
  );
}
