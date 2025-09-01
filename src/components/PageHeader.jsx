export default function PageHeader({ title, count }) {
  return (
    <div className="flex items-center gap-3">
      <h1 className="text-2xl font-semibold">{title}</h1>
      {typeof count === 'number' && (
        <span className="text-sm opacity-70">{count} total</span>
      )}
    </div>
  )
}


