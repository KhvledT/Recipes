export default function IngredientsList({ items, checked, onToggle, mealId }) {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {items.map((it, idx) => (
        <li
          key={idx}
          className="rounded-lg bg-white/95 dark:bg-[#111318] border dark:border-white/10 p-3 flex items-center justify-between gap-3 border-l-4 border-[color:var(--color-primary)]/15"
        >
          <label className="flex items-center gap-3 cursor-pointer w-full group">
            <input
              type="checkbox"
              className="peer h-5 w-5 accent-[color:var(--color-primary)] rounded"
              checked={checked.has(idx)}
              onChange={(e) => onToggle(idx, e.target.checked)}
            />
            <span className="flex-1">
              <div className={"font-medium transition " + (checked.has(idx) ? 'line-through opacity-60' : '')}>{it.name}</div>
              {it.measure && (
                <div className="text-xs text-muted mt-0.5">{it.measure}</div>
              )}
            </span>
          </label>
          <span className="inline-flex h-6 items-center rounded-full px-2 text-xs bg-[color:var(--color-primary)]/10 text-[color:var(--color-primary)]">
            #{idx + 1}
          </span>
        </li>
      ))}
    </ul>
  )
}


