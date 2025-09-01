import { Spinner } from '@heroui/react'

export default function LoadingCentered({ label }) {
  return (
    <div className="flex justify-center h-screen"><Spinner label={label} /></div>
  )
}


