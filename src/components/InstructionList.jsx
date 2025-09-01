export default function InstructionList({ steps }) {
  if (!steps || steps.length === 0) return null
  return (
    <ol className="space-y-3">
      {steps.map((group) => (
        <li key={group.displayIndex} className="rounded-lg bg-white/90 dark:bg-[#111318] border dark:border-white/10 p-4 border-l-4 border-[color:var(--color-primary)]/20">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 inline-flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[color:var(--color-primary)] text-white text-xs font-semibold">
              {group.displayIndex}
            </span>
            <div className="flex-1">
              <div className="font-semibold mb-1">{group.title}</div>
              <p className="leading-7 opacity-90 whitespace-pre-wrap">{group.body}</p>
            </div>
          </div>
        </li>
      ))}
    </ol>
  )
}


