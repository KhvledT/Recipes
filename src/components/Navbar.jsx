import { Navbar as HeroNavbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle, Input } from '@heroui/react'
import { useNavigate, NavLink, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function AppNavbar() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    // Close mobile menu on route change
    setIsMenuOpen(false)
  }, [location.pathname])

  function onSubmit(e) {
    e.preventDefault()
    const trimmed = query.trim()
    if (trimmed) {
      navigate(`/search?q=${encodeURIComponent(trimmed)}`)
      setQuery('')
    }
  }

  return (
    <HeroNavbar
      maxWidth="xl"
      className="bg-black/90 backdrop-blur supports-[backdrop-filter]:bg-black/75 border-b border-white/10 sticky top-0 z-50"
      style={{ color: 'white' }}
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarBrand>
        <NavLink to="/" className="font-semibold tracking-tight text-white">
          <span className="inline-block w-2 h-2 rounded-sm mr-2" style={{ backgroundColor: 'var(--color-accent)' }} />
          Recipes
        </NavLink>
      </NavbarBrand>

      <NavbarContent className="md:hidden" justify="end">
        <NavbarMenuToggle aria-label={isMenuOpen ? 'Close navigation' : 'Open navigation'} />
      </NavbarContent>

      <NavbarContent justify="center" className="gap-1 md:gap-2 hidden md:flex">
        <NavbarItem>
          <NavLink to="/" className={({isActive}) => `nav-link px-2 py-1 rounded-md hover:bg-white/5 ${isActive ? 'is-active' : ''}`}>Home</NavLink>
        </NavbarItem>
        <NavbarItem>
          <NavLink to="/categories" className={({isActive}) => `nav-link px-2 py-1 rounded-md hover:bg-white/5 ${isActive ? 'is-active' : ''}`}>Categories</NavLink>
        </NavbarItem>
        <NavbarItem>
          <NavLink to="/areas" className={({isActive}) => `nav-link px-2 py-1 rounded-md hover:bg-white/5 ${isActive ? 'is-active' : ''}`}>Areas</NavLink>
        </NavbarItem>
        <NavbarItem>
          <NavLink to="/ingredients" className={({isActive}) => `nav-link px-2 py-1 rounded-md hover:bg-white/5 ${isActive ? 'is-active' : ''}`}>Ingredients</NavLink>
        </NavbarItem>
        <NavbarItem>
          <NavLink to="/favorites" className={({isActive}) => `nav-link px-2 py-1 rounded-md hover:bg-white/5 ${isActive ? 'is-active' : ''}`}>Favorites</NavLink>
        </NavbarItem>
        
      </NavbarContent>
      <NavbarContent justify="end" className="hidden md:flex">
        <form onSubmit={onSubmit} className="flex items-center">
          <Input
            aria-label="Search meals"
            placeholder="Search meals..."
            size="sm"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-60 md:w-72"
            radius="sm"
            variant="bordered"
            classNames={{
              inputWrapper: 'bg-black border-white/15 hover:border-white/30',
              input: 'text-white placeholder-white/50',
            }}
            startContent={<span className="inline-block w-2 h-2 rounded-sm" style={{ backgroundColor: 'var(--color-accent)' }} />}
          />
        </form>
      </NavbarContent>

      <NavbarMenu>
        <div className="px-2 py-2">
          <form onSubmit={(e) => { onSubmit(e); setIsMenuOpen(false) }} className="flex items-center px-2 py-2">
            <Input
              aria-label="Search meals"
              placeholder="Search meals..."
              size="sm"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              radius="sm"
              variant="bordered"
              classNames={{
                inputWrapper: 'bg-black border-white/15 hover:border-white/30',
                input: 'text-white placeholder-white/50',
              }}
              startContent={<span className="inline-block w-2 h-2 rounded-sm" style={{ backgroundColor: 'var(--color-accent)' }} />}
            />
          </form>
        </div>
        <NavbarMenuItem>
          <NavLink to="/" onClick={() => setIsMenuOpen(false)} className={({isActive}) => `block px-3 py-2 rounded-md hover:bg-white/5 ${isActive ? 'is-active' : ''}`}>Home</NavLink>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <NavLink to="/categories" onClick={() => setIsMenuOpen(false)} className={({isActive}) => `block px-3 py-2 rounded-md hover:bg-white/5 ${isActive ? 'is-active' : ''}`}>Categories</NavLink>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <NavLink to="/areas" onClick={() => setIsMenuOpen(false)} className={({isActive}) => `block px-3 py-2 rounded-md hover:bg-white/5 ${isActive ? 'is-active' : ''}`}>Areas</NavLink>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <NavLink to="/ingredients" onClick={() => setIsMenuOpen(false)} className={({isActive}) => `block px-3 py-2 rounded-md hover:bg-white/5 ${isActive ? 'is-active' : ''}`}>Ingredients</NavLink>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <NavLink to="/favorites" onClick={() => setIsMenuOpen(false)} className={({isActive}) => `block px-3 py-2 rounded-md hover:bg-white/5 ${isActive ? 'is-active' : ''}`}>Favorites</NavLink>
        </NavbarMenuItem>
      </NavbarMenu>
    </HeroNavbar>
  )
}


