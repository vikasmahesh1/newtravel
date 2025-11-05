export function OfferCard({ title, description, cta, badge, market }) {
  return (
    <article className="card flex flex-col gap-3">
      {badge && <span className="badge self-start">{badge}</span>}
      {market && (
        <span className="badge self-start bg-primary/10 text-primary">{market}</span>
      )}
      <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
      <p className="text-sm text-slate-600">{description}</p>
      {cta && (
        <button type="button" className="btn-secondary w-fit">
          {cta}
        </button>
      )}
    </article>
  )
}
