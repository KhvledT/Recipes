import { Link } from 'react-router-dom'

export default function MealCard({ to, title, image, subtitle }) {
  return (
    <Link
      to={to}
      className="group relative block rounded-xl border border-black/5 bg-white/90 dark:bg-[#111318] backdrop-blur-sm shadow-sm hover:shadow-lg transition overflow-hidden ring-1 ring-transparent hover:ring-[color:var(--color-primary)]/20"
    >
      <div className="overflow-hidden relative w-full h-44 md:h-48 bg-gray-100">
        <img src={image} alt={title} className="w-full h-full object-cover transition duration-300 group-hover:scale-[1.04]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-[var(--color-primary)] to-[#FF8C42] opacity-90" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-transparent" />
        <span className="absolute top-2 left-2 inline-flex items-center rounded px-2 py-0.5 text-[11px] font-semibold bg-[color:var(--color-accent,#F1C40F)] text-black/80 shadow">
          Meal
        </span>
        <div className="absolute inset-x-0 bottom-0 p-3 flex items-end justify-between">
          <h3 className="text-white drop-shadow-sm font-semibold tracking-tight line-clamp-2">
            {title}
          </h3>
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/90 dark:bg-white/80 text-[color:var(--color-primary)] opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition">→</span>
        </div>
      </div>
      {subtitle && (
        <div className="p-3 border-t border-black/5 text-sm text-[color:var(--color-text-muted,#666666)] dark:text-[color:var(--text-light,#EEEEEE)]/70">
          {subtitle}
        </div>
      )}
    </Link>
  )
}


