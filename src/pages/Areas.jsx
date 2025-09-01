import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import MealCard from '../components/MealCard.jsx'
import { apiClient, endpoints } from '../lib/api.js'
import CardGrid from '../components/CardGrid.jsx'
import PageHeader from '../components/PageHeader.jsx'
import LoadingCentered from '../components/LoadingCentered.jsx'
import AutoCompleteField from '../components/AutoCompleteField.jsx'

export default function Areas() {
  const [areas, setAreas] = useState([])
  const [meals, setMeals] = useState([])
  const [loading, setLoading] = useState(true)
  const [params, setParams] = useSearchParams()
  const selected = params.get('a')
  const [areaInput, setAreaInput] = useState('')

  useEffect(() => {
    let isMounted = true
    async function loadAreas() {
      const { data } = await apiClient.get(endpoints.listAreas)
      if (isMounted) setAreas(data?.meals ?? [])
    }
    loadAreas()
    return () => { isMounted = false }
  }, [])

  // Set default selection to first area once areas are loaded
  useEffect(() => {
    if (!selected && areas.length > 0) {
      setParams({ a: areas[0].strArea })
    }
  }, [areas, selected, setParams])

  useEffect(() => {
    let isMounted = true
    async function loadMeals() {
      setLoading(true)
      try {
        if (selected) {
          const { data } = await apiClient.get(endpoints.filterByArea(selected))
          if (isMounted) setMeals(data?.meals ?? [])
        } else {
          setMeals([])
        }
      } finally {
        if (isMounted) setLoading(false)
      }
    }
    loadMeals()
    return () => { isMounted = false }
  }, [selected])

  // Keep input text in sync with current selection
  useEffect(() => {
    if (selected) setAreaInput(selected)
    else if (areas[0]?.strArea) setAreaInput(areas[0].strArea)
  }, [selected, areas])

  function onAreaInputChange(e) {
    const val = e.target.value
    setAreaInput(val)
    const match = areas.find(a => a.strArea === val)
    if (match) {
      setParams({ a: val })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <PageHeader title="Areas" count={areas.length} />
        <div className="flex gap-2 items-end">
          <AutoCompleteField
            listId="areas-list"
            placeholder="Search or select area..."
            value={areaInput}
            onChange={onAreaInputChange}
            className="sm:w-80"
          />
          <datalist id="areas-list">
            {areas.map(a => (
              <option key={a.strArea} value={a.strArea} />
            ))}
          </datalist>
        </div>
      </div>
      {loading ? (
        <LoadingCentered label="Loading" />
      ) : (
        <CardGrid columns="grid-cols-[repeat(auto-fill,minmax(220px,1fr))]">
          {meals.map(m => (
            <MealCard key={m.idMeal} to={`/meal/${m.idMeal}`} title={m.strMeal} image={m.strMealThumb} />
          ))}
        </CardGrid>
      )}
    </div>
  )
}


