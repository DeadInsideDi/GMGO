'use client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import './not-found.scss'

export default function Page() {
  const router = useRouter()
  useEffect(() => router.replace('/'), [router])
  return (
    <div className='not-found'>
      <p>Холодный взгляд Смотрящего выражает лёгкий интерес</p>
    </div>
  )
}
