import { Link } from 'react-router-dom'

export default function SectionHeader({ title, actionHref, actionText }) {
  return (
    <div className="flex items-center justify-between mb-3">
      <h2 className="text-xl font-semibold">{title}</h2>
      {actionHref && actionText ? (
        <Link to={actionHref} className="text-sm underline">{actionText}</Link>
      ) : null}
    </div>
  )
}


