import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { apiClient, endpoints } from '../lib/api.js'
import { Spinner, Skeleton } from '@heroui/react'
import IngredientsList from '../components/IngredientsList.jsx'
import InstructionList from '../components/InstructionList.jsx'

function parseIngredients(meal) {
  const items = []
  for (let i = 1; i <= 20; i++) {
    const ing = meal[`strIngredient${i}`]
    const measure = meal[`strMeasure${i}`]
    if (ing && ing.trim()) items.push({ name: ing, measure: measure || '' })
  }
  return items
}

// Groups instructions into steps by recognizing headers like "STEP 1", "Step 2" or a bare number line
function parseInstructionGroups(text) {
  if (!text) return []
  const lines = text
    .split(/\r?\n+/)
    .map((l) => l.trim())
    .filter(Boolean)

  const groups = []
  let current = null

  const startGroup = (num, title) => {
    if (current) groups.push(current)
    const index = Number.isFinite(num) ? Number(num) : groups.length + 1
    current = { index, title: title || `Step ${index}`, body: [] }
  }

  for (const line of lines) {
    const stepMatch = /^(?:step|STEP)\s*(\d+)$/i.exec(line)
    const numberOnly = /^(\d{1,2})(?:[\.)])?$/.exec(line)

    if (stepMatch) {
      const num = parseInt(stepMatch[1], 10)
      if (current && current.body.length === 0 && current.index === num) {
        current.title = `Step ${num}`
      } else {
        startGroup(num, `Step ${num}`)
      }
      continue
    }

    if (numberOnly) {
      const num = parseInt(numberOnly[1], 10)
      if (current && current.body.length === 0 && current.index === num) {
        // duplicate header line; skip
      } else {
        startGroup(num)
      }
      continue
    }

    if (!current) startGroup(undefined)
    current.body.push(line)
  }

  if (current) groups.push(current)

  // Normalize ordering to display order regardless of provided numbers
  return groups.map((g, i) => ({
    displayIndex: i + 1,
    title: `Step ${i + 1}`,
    body: g.body.join('\n')
  }))
}

export default function MealDetails() {
  const { id } = useParams()
  const [meal, setMeal] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isFavorite, setIsFavorite] = useState(false)
  const [checkedIngredients, setCheckedIngredients] = useState(new Set())
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    let isMounted = true
    async function load() {
      setLoading(true)
      try {
        const { data } = await apiClient.get(endpoints.lookupById(id))
        if (isMounted) setMeal(data?.meals?.[0] || null)
      } finally {
        if (isMounted) setLoading(false)
      }
    }
    load()
    return () => { isMounted = false }
  }, [id])

  useEffect(() => {
    if (!meal) return
    const list = JSON.parse(localStorage.getItem('favorites') || '[]')
    const exists = list.some((m) => m.idMeal === meal.idMeal)
    setIsFavorite(exists)
    try {
      const raw = localStorage.getItem(`checkedIngredients:${meal.idMeal}`)
      const arr = raw ? JSON.parse(raw) : []
      setCheckedIngredients(new Set(arr))
    } catch {
      setCheckedIngredients(new Set())
    }
  }, [meal])

  // Hooks must not be conditionally skipped. Compute memoized values safely before early returns.
  const tags = useMemo(() => {
    const tagStr = meal?.strTags
    return tagStr ? tagStr.split(',').map((t) => t.trim()).filter(Boolean) : []
  }, [meal?.strTags])

  const instructionSteps = useMemo(() => {
    const instr = meal?.strInstructions
    return parseInstructionGroups(instr)
  }, [meal?.strInstructions])

  function toggleFavorite() {
    const list = JSON.parse(localStorage.getItem('favorites') || '[]')
    const exists = list.find((m) => m.idMeal === meal.idMeal)
    let updated
    if (exists) {
      updated = list.filter((m) => m.idMeal !== meal.idMeal)
    } else {
      updated = [...list, { idMeal: meal.idMeal, strMeal: meal.strMeal, strMealThumb: meal.strMealThumb }]
    }
    localStorage.setItem('favorites', JSON.stringify(updated))
    setIsFavorite(!exists)
  }

  if (loading) return (
    <div className="space-y-8">
      <div className="section p-4 md:p-6 space-y-4">
        <div className="flex flex-col md:flex-row gap-6">
          <Skeleton className="w-full md:w-80 lg:w-96 h-64 md:h-64 lg:h-72 rounded-xl" />
          <div className="flex-1 space-y-4">
            <Skeleton className="h-8 w-2/3 rounded-md" />
            <div className="flex gap-2">
              <Skeleton className="h-6 w-24 rounded-full" />
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>
            <div className="flex gap-3">
              <Skeleton className="h-10 w-36 rounded-md" />
              <Skeleton className="h-10 w-28 rounded-md" />
            </div>
          </div>
        </div>
      </div>
      <section>
        <Skeleton className="h-6 w-40 mb-3 rounded" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-16 rounded-lg" />
          ))}
        </div>
      </section>
      <section>
        <Skeleton className="h-6 w-40 mb-3 rounded" />
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-start gap-3">
              <Skeleton className="h-6 w-6 rounded-full" />
              <Skeleton className="h-6 w-full rounded" />
            </div>
          ))}
        </div>
      </section>
    </div>
  )
  if (!meal) return <p>Meal not found.</p>

  const ingredients = parseIngredients(meal)

  function getYoutubeId(url) {
    if (!url) return null
    try {
      const u = new URL(url)
      const v = u.searchParams.get('v')
      if (v) return v
      // Fallback for youtu.be/ID
      if (u.hostname.includes('youtu.be')) return u.pathname.replace('/', '') || null
      return null
    } catch {
      return null
    }
  }
  const youtubeId = getYoutubeId(meal.strYoutube)

  return (
    <div
      className="relative rounded-2xl overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${meal.strMealThumb})` }}
    >
      <div className="absolute inset-0 bg-black/55" />
      <div className="relative z-10 space-y-8 p-4 md:p-6">
        {/* Ingredients */}
        <section className="pb-20">
          <h2 className="text-xl font-semibold mb-3">Ingredients</h2>
          <div className="mb-3" />
          <IngredientsList
            items={ingredients}
            checked={checkedIngredients}
            onToggle={(idx, isChecked) => {
              const next = new Set(checkedIngredients)
              if (isChecked) next.add(idx); else next.delete(idx)
              setCheckedIngredients(next)
              try {
                if (meal?.idMeal) {
                  localStorage.setItem(`checkedIngredients:${meal.idMeal}`, JSON.stringify(Array.from(next)))
                }
              } catch {}
            }}
            mealId={meal?.idMeal}
          />
        </section>

        {/* Instructions */}
        <section>
          <h2 className="text-xl font-semibold mb-3">Instructions</h2>
          {instructionSteps.length > 0 ? (
            <InstructionList steps={instructionSteps} />
          ) : (
            <p className="whitespace-pre-wrap leading-7">{meal.strInstructions}</p>
          )}
        </section>
      </div>
    </div>
  )
}


