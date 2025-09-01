export default function CardGrid({ children, columns = 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' }) {
  return (
    <div className={`grid ${columns} gap-4`}>
      {children}
    </div>
  )
}


