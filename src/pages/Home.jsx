import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { apiClient, endpoints } from '../lib/api.js'
import MealCard from '../components/MealCard.jsx'
import CategoryCard from '../components/CategoryCard.jsx'
import HeroIntro from '../components/HeroIntro.jsx'
import QuickLinkCard from '../components/QuickLinkCard.jsx'
import SectionHeader from '../components/SectionHeader.jsx'
import CardGrid from '../components/CardGrid.jsx'
import LoadingCentered from '../components/LoadingCentered.jsx'

export default function Home() {
  const [featured, setFeatured] = useState([])
  const [cats, setCats] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let alive = true
    async function load() {
      try {
        setLoading(true)
        const [cRes, ...rMeals] = await Promise.all([
          apiClient.get(endpoints.categories),
          apiClient.get(endpoints.randomMeal),
          apiClient.get(endpoints.randomMeal),
          apiClient.get(endpoints.randomMeal),
          apiClient.get(endpoints.randomMeal),
          apiClient.get(endpoints.randomMeal),
          apiClient.get(endpoints.randomMeal),
        ])
        if (!alive) return
        const categories = cRes.data?.categories ?? []
        const meals = rMeals
          .map(r => r.data?.meals?.[0])
          .filter(Boolean)
        // De-duplicate by id
        const unique = []
        const seen = new Set()
        for (const m of meals) {
          if (!seen.has(m.idMeal)) { seen.add(m.idMeal); unique.push(m) }
        }
        setCats(categories.slice(0, 8))
        setFeatured(unique.slice(0, 6))
      } catch (e) {
        // no-op
      } finally {
        if (alive) setLoading(false)
      }
    }
    load()
    return () => { alive = false }
  }, [])

  if (loading) {
    return <LoadingCentered label="Loading" />
  }
  return (
    <div className="space-y-12">
      <HeroIntro />
      <section className="px-4">
        <div className="mx-auto max-w-6xl">
          <CardGrid columns="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <QuickLinkCard
              to="/categories"
              title="Categories"
              description="Browse meals by curated categories."
              icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 3H3v7h7V3Zm11 0h-7v7h7V3ZM10 14H3v7h7v-7Zm11 0h-7v7h7v-7Z" fill="currentColor"/></svg>}
              accentClass="text-[color:var(--color-primary)]"
              badgeBg="bg-[color:var(--color-primary)]"
            />
            <QuickLinkCard
              to="/areas"
              title="Areas"
              description="Discover cuisines by country/region."
              icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2a10 10 0 100 20 10 10 0 000-20Zm0 18a8 8 0 110-16 8 8 0 010 16Z" fill="currentColor"/><path d="M4 12h16M12 4c2.5 2.5 2.5 13.5 0 16M12 4c-2.5 2.5-2.5 13.5 0 16" stroke="currentColor" strokeWidth="1.2"/></svg>}
              accentClass="text-emerald-500"
              badgeBg="bg-emerald-500"
            />
            <QuickLinkCard
              to="/ingredients"
              title="Ingredients"
              description="Find meals by a main ingredient."
              icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 4v5.586l-5.293 5.293A1 1 0 005 16h14a1 1 0 00.707-1.707L14 9.586V4h-4Z" fill="currentColor"/></svg>}
              accentClass="text-amber-500"
              badgeBg="bg-amber-500"
            />
            <QuickLinkCard
              to="/favorites"
              title="Favorites"
              description="Quickly access your saved meals."
              icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12.001 20.727l-.001-.001-.013-.012a39.68 39.68 0 01-3.108-2.778 26.28 26.28 0 01-3.2-3.197C3.57 12.49 2.25 10.21 2.25 8.25 2.25 5.351 4.6 3 7.5 3c1.69 0 3.223.744 4.25 1.917A5.64 5.64 0 0116 3c2.9 0 5.25 2.351 5.25 5.25 0 1.96-1.32 4.24-3.429 6.489a26.28 26.28 0 01-3.2 3.197 39.68 39.68 0 01-3.108 2.778l-.012.011-.001.002-.4.273-.4-.273Z"/></svg>}
              accentClass="text-pink-500"
              badgeBg="bg-pink-500"
            />
          </CardGrid>
        </div>
      </section>
      <section className="px-4">
        <div className="mx-auto max-w-6xl">
          <SectionHeader title="Featured Meals" actionHref="/search" actionText="Search more" />
          <CardGrid>
            {featured.map(m => (
              <MealCard key={m.idMeal} to={`/meal/${m.idMeal}`} title={m.strMeal} image={m.strMealThumb} subtitle={`${m.strCategory} • ${m.strArea}`} />
            ))}
          </CardGrid>
        </div>
      </section>
      <section className="px-4">
        <div className="mx-auto max-w-6xl mt-8">
          <SectionHeader title="Popular Categories" actionHref="/categories" actionText="View all" />
          <CardGrid columns="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {cats.map(c => (
              <CategoryCard key={c.idCategory} to={`/categories/${encodeURIComponent(c.strCategory)}`} title={c.strCategory} image={c.strCategoryThumb} />
            ))}
          </CardGrid>
        </div>
      </section>
    </div>  
  )
}

