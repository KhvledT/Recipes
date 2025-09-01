export default function Footer() {
  return (
    <footer className="mt-10 border-t border-black/5 dark:border-white/10">
      <div className="mx-auto w-full text-center max-w-6xl px-4 py-8 text-sm opacity-80 flex flex-col md:flex-row items-center justify-center gap-3">
        <div>
          <p>© {new Date().getFullYear()} Recipes, All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}


