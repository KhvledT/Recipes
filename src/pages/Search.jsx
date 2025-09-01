import { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import MealCard from '../components/MealCard.jsx'
import { apiClient, endpoints } from '../lib/api.js'
import LoadingCentered from '../components/LoadingCentered.jsx'
import CardGrid from '../components/CardGrid.jsx'
import SearchField from '../components/SearchField.jsx'

export default function Search() {
  const [params, setParams] = useSearchParams()
  const q = params.get('q') || ''
  const [query, setQuery] = useState(q)
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => { setQuery(q) }, [q])

  useEffect(() => {
    let isMounted = true
    async function run() {
      if (!q) { setResults([]); return }
      setLoading(true)
      try {
        const { data } = await apiClient.get(endpoints.searchByName(q))
        if (isMounted) setResults(data?.meals ?? [])
      } finally {
        if (isMounted) setLoading(false)
      }
    }
    run()
    return () => { isMounted = false }
  }, [q])

  function onSubmit(e) {
    e.preventDefault()
    setParams(query ? { q: query } : {})
  }

  if (loading) {return <LoadingCentered label="Loading" />}

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Search</h1>
      <form onSubmit={onSubmit} className="flex gap-2">
        <SearchField value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search meals..." className="max-w-md" />
      </form>
      <CardGrid columns="grid-cols-[repeat(auto-fill,minmax(220px,1fr))]">
        {results.map(m => (
          <MealCard key={m.idMeal} to={`/meal/${m.idMeal}`} title={m.strMeal} image={m.strMealThumb} />
        ))}
      </CardGrid>
    </div>
  )
}


