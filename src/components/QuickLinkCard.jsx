import { Link } from 'react-router-dom'

export default function QuickLinkCard({ to, title, description, icon, accentClass = 'text-[color:var(--color-primary)]', badgeBg = 'bg-[color:var(--color-primary)]' }) {
  return (
    <Link to={to} className="group relative block rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#111318] shadow-sm hover:shadow-md transition overflow-hidden p-5">
      <div className="flex items-start gap-3">
        <span className={`inline-flex h-10 w-10 items-center justify-center rounded-md ${badgeBg} text-white/95`}>
          {icon}
        </span>
        <div>
          <h3 className="font-semibold tracking-tight text-[color:var(--color-text,#333333)] dark:text-[color:var(--text-light,#EEEEEE)]">{title}</h3>
          <p className="mt-1 text-sm text-[color:var(--color-text-muted,#666666)] dark:text-white/70">{description}</p>
          <span className={`mt-3 inline-flex items-center ${accentClass}`}>Explore →</span>
        </div>
      </div>
    </Link>
  )
}


