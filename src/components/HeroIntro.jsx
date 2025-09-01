import { Link } from 'react-router-dom'

export default function HeroIntro() {
  return (
    <section className="rounded-2xl p-12 md:p-16 text-center min-h-[50dvh] flex flex-col items-center justify-center">
      <h1 className="mt-2 text-5xl md:text-6xl font-semibold tracking-tight text-[color:var(--color-text,#333333)] dark:text-[color:var(--text-light,#EEEEEE)]">Recipes</h1>
      <p className="mt-4 max-w-2xl mx-auto text-base md:text-lg text-[color:var(--color-text-muted,#666666)] dark:text-white/70 leading-7">
        Discover recipes from around the world. Save your favorites and follow step-by-step
        instructions to cook delicious meals at home.
      </p>
      <div className="mt-8 flex flex-col sm:flex-row gap-3">
        <Link to="/categories" className="btn btn-primary">Browse Categories</Link>
        <Link to="/areas" className="btn btn-outline">Explore Areas</Link>
      </div>
    </section>
  )
}


