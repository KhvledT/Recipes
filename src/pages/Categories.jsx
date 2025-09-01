import { useParams, Link } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import { Chip } from '@heroui/react'
import LoadingCentered from '../components/LoadingCentered.jsx'
import MealCard from '../components/MealCard.jsx'
import CategoryCard from '../components/CategoryCard.jsx'
import { apiClient, endpoints } from '../lib/api.js'
import CardGrid from '../components/CardGrid.jsx'
import SearchField from '../components/SearchField.jsx'

export default function Categories() {
  const { category } = useParams()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [mealQuery, setMealQuery] = useState('')

  // Map categories data consistently so hooks order is stable
  const categoriesData = useMemo(() => {
    if (category) return []
    return items
      .filter((c) => c && typeof c.strCategory === 'string')
      .map((c) => ({
      key: c.idCategory ?? c.strCategory,
      title: c.strCategory,
      thumb: c.strCategoryThumb,
    }))
  }, [items, category])

  const filteredCategories = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return categoriesData
    return categoriesData.filter(c => c.title.toLowerCase().includes(q))
  }, [categoriesData, query])

  // Meals filtered list guarded against undefined fields
  const filteredMeals = useMemo(() => {
    const q = mealQuery.trim().toLowerCase()
    return items.filter((it) => typeof it?.strMeal === 'string' && it.strMeal.toLowerCase().includes(q))
  }, [items, mealQuery])

  
// fetch data
  useEffect(() => {
    let isMounted = true
    async function fetchData() {
      setLoading(true)
      try {
        if (category) {
          const { data } = await apiClient.get(endpoints.filterByCategory(category))
          if (isMounted) setItems(data?.meals ?? [])
        } else {
          const { data } = await apiClient.get(endpoints.categories)
          if (isMounted) setItems(data?.categories ?? [])
        }
      } finally {
        if (isMounted) setLoading(false)
      }
    }
    fetchData()
    return () => {
      isMounted = false
    }
  }, [category])

  if (loading) {return <LoadingCentered label="Loading" />}

  if (!category) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold">Categories</h1>
            <Chip className="chip-primary">{filteredCategories.length}</Chip>
          </div>
          <SearchField
            placeholder="Search categories..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full sm:w-72"
          />
        </div>
        <CardGrid columns="grid-cols-[repeat(auto-fill,minmax(220px,1fr))]">
          {filteredCategories.map((t,index) => (
            <CategoryCard
              key={index}
              to={`/categories/${encodeURIComponent(t.title)}`}
              title={t.title}
              image={t.thumb}
              subtitle={`Explore ${t.title} recipes`}
            />
          ))}
        </CardGrid>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-semibold">Meals in {category}</h1>
          <Chip className="chip-primary">{items.length}</Chip>
          <Link to="/categories" className="underline text-sm opacity-80">← All categories</Link>
        </div>
        <SearchField
          placeholder="Search meals..."
          value={mealQuery}
          onChange={(e) => setMealQuery(e.target.value)}
          className="w-full sm:w-72"
        />
      </div>
      <CardGrid columns="grid-cols-[repeat(auto-fill,minmax(220px,1fr))]">
        {filteredMeals.map((item,index) => (
          <MealCard key={index} to={`/meal/${item.idMeal}`} title={item.strMeal} image={item.strMealThumb} />
        ))}
      </CardGrid>
    </div>
  )
}


