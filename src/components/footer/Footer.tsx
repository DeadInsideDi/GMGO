import Link from 'next/link'
import { FC } from 'react'
import { CONFIDENTIALITY_ROUTE, RULES_ROUTE } from '../../constants'
import { useAppStore } from '../../store/app.store'
import './Footer.scss'

export type TFooterProps = {}

export const Footer: FC<TFooterProps> = ({}) => {
  const { setIsDialogOpen } = useAppStore()
  return (
    <div className='footer'>
      <Link
        onClick={() => setIsDialogOpen(false)}
        className='rules'
        href={RULES_ROUTE}>
        Правила площадки
      </Link>
      <Link
        onClick={() => setIsDialogOpen(false)}
        className='confidentiality'
        href={CONFIDENTIALITY_ROUTE}>
        Конфиденциальность
      </Link>
      <hr />
      <p className='copyright'>© 2025 GMGO</p>
      <p className='designer'>
        Designed by{' '}
        <Link
          onClick={() => setIsDialogOpen(false)}
          className='primary-link'
          href={'/'}>
          MatSen
        </Link>
      </p>
    </div>
  )
}
