export default function AutoCompleteField({ listId, value, onChange, placeholder, className = '' }) {
  return (
    <input
      list={listId}
      aria-label={placeholder}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      name="autocomplete"
      className={`h-10 px-3 rounded-md border border-white/10 bg-black text-white placeholder-white/50 ${className}`}
    />
  )
}


