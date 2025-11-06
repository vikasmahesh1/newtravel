const options = [
  { id: 'Domestic', label: 'Domestic' },
  { id: 'International', label: 'International' },
]

export function MarketSelector({ value, onChange, label = 'Travel focus', idPrefix = 'market' }) {
  return (
    <fieldset className="space-y-2">
      <legend className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isActive = value === option.id
          const baseClasses =
            'inline-flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition'
          const activeClasses = 'border-primary bg-primary/10 text-primary shadow-sm shadow-primary/30'
          const inactiveClasses = 'border-transparent bg-slate-100 text-slate-500 hover:bg-slate-200'
          return (
            <label
              key={option.id}
              htmlFor={`${idPrefix}-${option.id.toLowerCase()}`}
              className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
            >
              <input
                type="radio"
                id={`${idPrefix}-${option.id.toLowerCase()}`}
                name={idPrefix}
                value={option.id}
                checked={isActive}
                onChange={(event) => onChange(event.target.value)}
                className="sr-only"
              />
              {option.label}
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}

export default MarketSelector
