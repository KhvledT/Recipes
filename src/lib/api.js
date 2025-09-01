import axios from 'axios'

export const apiClient = axios.create({
  baseURL: 'https://www.themealdb.com/api/json/v1/1/',
})

export const endpoints = {
  searchByName: (name) => `search.php?s=${encodeURIComponent(name)}`,
  searchByFirstLetter: (letter) => `search.php?f=${encodeURIComponent(letter)}`,
  lookupById: (id) => `lookup.php?i=${encodeURIComponent(id)}`,
  randomMeal: 'random.php',
  categories: 'categories.php',
  listCategories: 'list.php?c=list',
  listAreas: 'list.php?a=list',
  listIngredients: 'list.php?i=list',
  filterByIngredient: (ingredient) => `filter.php?i=${encodeURIComponent(ingredient)}`,
  filterByCategory: (category) => `filter.php?c=${encodeURIComponent(category)}`,
  filterByArea: (area) => `filter.php?a=${encodeURIComponent(area)}`,
}

export const themeColors = {
  primary: '#FF4C29',
  secondary: '#2ECC71',
  accent: '#F1C40F',
  backgroundLight: '#FAFAFA',
  backgroundCard: '#FFFFFF',
  backgroundDark: '#1E1E1E',
  backgroundSection: '#F5F5F5',
  textPrimary: '#333333',
  textSecondary: '#666666',
}


