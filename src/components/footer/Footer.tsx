import Link from 'next/link'
import { FC } from 'react'
import { CONFIDENTIALITY_ROUTE, RULES_ROUTE } from '../../constants'
import './Footer.scss'

export type TFooterProps = {}

export const Footer: FC<TFooterProps> = ({}) => {
  return (
    <div className='footer'>
      <Link
        className='rules'
        href={RULES_ROUTE}>
        Правила площадки
      </Link>
      <Link
        className='confidentiality'
        href={CONFIDENTIALITY_ROUTE}>
        Конфиденциальность
      </Link>
      <hr />
      <p className='copyright'>© 2025 GMGO</p>
      <p className='designer'>
        Designed by{' '}
        <Link
          className='primary-link'
          href={'/'}>
          MatSen
        </Link>
      </p>
    </div>
  )
}
