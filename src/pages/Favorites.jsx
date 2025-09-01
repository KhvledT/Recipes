import { useEffect, useState } from 'react'
import MealCard from '../components/MealCard.jsx'
import CardGrid from '../components/CardGrid.jsx'
import PageHeader from '../components/PageHeader.jsx'

export default function Favorites() {
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('favorites') || '[]')
    setFavorites(Array.isArray(data) ? data : [])
  }, [])

  return (
    <div className="space-y-6">
      <PageHeader title="Favorites" count={favorites.length} />
      {favorites.length === 0 ? (
        <p>No favorites yet.</p>
      ) : (
        <CardGrid columns="grid-cols-[repeat(auto-fill,minmax(220px,1fr))]">
          {favorites.map(f => (
            <MealCard key={f.idMeal} to={`/meal/${f.idMeal}`} title={f.strMeal} image={f.strMealThumb} />
          ))}
        </CardGrid>
      )}
    </div>
  )
}


