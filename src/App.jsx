import { Suspense } from 'react'
import { HeroUIProvider } from '@heroui/react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Layout from './routes/Layout.jsx'
import Home from './pages/Home.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'categories', lazy: () => import('./pages/Categories.jsx').then(m => ({ Component: m.default })) },
      { path: 'categories/:category', lazy: () => import('./pages/Categories.jsx').then(m => ({ Component: m.default })) },
      { path: 'areas', lazy: () => import('./pages/Areas.jsx').then(m => ({ Component: m.default })) },
      { path: 'ingredients', lazy: () => import('./pages/Ingredients.jsx').then(m => ({ Component: m.default })) },
      { path: 'favorites', lazy: () => import('./pages/Favorites.jsx').then(m => ({ Component: m.default })) },
      { path: 'search', lazy: () => import('./pages/Search.jsx').then(m => ({ Component: m.default })) },
      { path: 'meal/:id', lazy: () => import('./pages/MealDetails.jsx').then(m => ({ Component: m.default })) },
      { path: '*', lazy: () => import('./pages/NotFound.jsx').then(m => ({ Component: m.default })) },
    ],
  },
])

export default function App() {
  return (
    <HeroUIProvider>
      <Suspense fallback={<div style={{padding:12}}>Loading…</div>}>
        <RouterProvider router={router} fallbackElement={<div style={{padding:12}}>Loading…</div>} />
      </Suspense>
    </HeroUIProvider>
  )
}