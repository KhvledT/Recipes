import { useNavigate, useLocation } from 'react-router-dom'

export default function MobileBackButton() {
	const navigate = useNavigate()
	const location = useLocation()

	if (location.pathname === '/') return null

	function goBack() {
		try {
			if (window.history.length > 1) navigate(-1)
			else navigate('/')
		} catch {
			navigate('/')
		}
	}

	return (
		<button
			onClick={goBack}
			aria-label="Go back"
			className="fixed bottom-4 left-4 md:hidden z-50 inline-flex items-center justify-center h-11 w-11 rounded-full bg-black text-white border border-white/10 shadow-lg active:scale-95"
		>
			<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
			</svg>
		</button>
	)
}


