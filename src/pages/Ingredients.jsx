import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import MealCard from '../components/MealCard.jsx'
import { apiClient, endpoints } from '../lib/api.js'
import CardGrid from '../components/CardGrid.jsx'
import PageHeader from '../components/PageHeader.jsx'
import LoadingCentered from '../components/LoadingCentered.jsx'
import AutoCompleteField from '../components/AutoCompleteField.jsx'

export default function Ingredients() {
  const [ingredients, setIngredients] = useState([])
  const [meals, setMeals] = useState([])
  const [loading, setLoading] = useState(false)
  const [params, setParams] = useSearchParams()
  const selected = params.get('i')
  const [ingredientInput, setIngredientInput] = useState('')

  useEffect(() => {
    let isMounted = true
    async function loadIngredients() {
      const { data } = await apiClient.get(endpoints.listIngredients)
      if (isMounted) {
        const list = (data?.meals ?? [])
        setIngredients(list)
      }
    }
    loadIngredients()
    return () => { isMounted = false }
  }, [])

  // Default to first ingredient if none selected after ingredients are loaded
  useEffect(() => {
    if (!selected && ingredients.length > 0) {
      setParams({ i: ingredients[0].strIngredient })
    }
  }, [ingredients, selected, setParams])

  useEffect(() => {
    let isMounted = true
    async function loadMeals() {
      if (!selected) { setMeals([]); return }
      setLoading(true)
      try {
        const { data } = await apiClient.get(endpoints.filterByIngredient(selected))
        if (isMounted) setMeals(data?.meals ?? [])
      } finally {
        if (isMounted) setLoading(false)
      }
    }
    loadMeals()
    return () => { isMounted = false }
  }, [selected])

  // Keep input text in sync with current selection
  useEffect(() => {
    if (selected) setIngredientInput(selected)
    else if (ingredients[0]?.strIngredient) setIngredientInput(ingredients[0].strIngredient)
  }, [selected, ingredients])

  function onIngredientInputChange(e) {
    const val = e.target.value
    setIngredientInput(val)
    const match = ingredients.find(x => x.strIngredient === val)
    if (match) setParams({ i: val })
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Ingredients" />
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex gap-2 items-end">
          <AutoCompleteField
            listId="ingredients-list"
            placeholder="Search or select ingredient..."
            value={ingredientInput}
            onChange={onIngredientInputChange}
            className="sm:w-80"
          />
          <datalist id="ingredients-list">
            {ingredients.map(ing => (
              <option key={ing.idIngredient ?? ing.strIngredient} value={ing.strIngredient} />
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


