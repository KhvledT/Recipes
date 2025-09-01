import { Link } from 'react-router-dom'

export default function CategoryCard({ to, title, image, subtitle }) {
  return (
    <Link
      to={to}
      className="group relative block rounded-xl border border-black/5 bg-white/90 dark:bg-[#111318] backdrop-blur-sm shadow-sm hover:shadow-lg transition overflow-hidden ring-1 ring-transparent hover:ring-[color:var(--color-primary)]/20"
    >
      <div className="relative w-full h-48 bg-gray-100">
        <img src={image} alt={title} className="w-full h-full object-cover transition duration-300 group-hover:scale-[1.04]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-[var(--color-primary)] to-[#FF8C42] opacity-90" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-3">
          <h3 className="text-white drop-shadow-sm font-semibold tracking-tight line-clamp-2">{title}</h3>
          {subtitle && <p className="mt-1 text-xs text-white/80 line-clamp-2">{subtitle}</p>}
        </div>
      </div>
    </Link>
  )
}


