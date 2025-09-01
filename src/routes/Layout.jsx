import { Outlet } from 'react-router-dom'
import AppNavbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import MobileBackButton from '../components/MobileBackButton.jsx'
import ScrollToTop from '../components/ScrollToTop.jsx'

export default function Layout() {
  return (
    <div className="min-h-dvh text-[color:var(--color-text,#333333)] dark:text-[color:var(--text-light,#EEEEEE)]">
      <AppNavbar />
      <ScrollToTop />
      <MobileBackButton />
      <main className="mx-auto max-w-6xl px-4 py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}


