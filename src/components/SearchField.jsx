export default function SearchField({ value, onChange, placeholder = 'Search...', className = '' }) {
  return (
    <input
      aria-label={placeholder}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`h-10 px-3 rounded-md border border-white/10 bg-black text-white placeholder-white/50 ${className}`}
    />
  )
}


