'use client'
import Image from 'next/image'
import { FC, useEffect, useRef, useState } from 'react'
import { ArrowDownMobile, Close } from '../../../public'
import { useAccountStore } from '../../store/account.store'
import { useAccountsStore } from '../../store/accountsServer.store'
import { useAppStore } from '../../store/app.store'
import { Authorization, EmailInputStep, EmailSended, Registration } from './Form'
import './RegistrationDialog.scss'

export const RegistrationDialog: FC = () => {
  const [step, setSteps] = useState(1)
  const [email, setEmail] = useState('vlad@flatonica.com')
  const [password, setPassword] = useState('123')

  const dialogRef = useRef<HTMLDialogElement>(null)

  const { isExistAccountByEmail, getAccountByEmail, addAccount } = useAccountsStore()
  const { login } = useAccountStore()
  const { isMobile, isDialogOpen, setIsDialogOpen } = useAppStore()

  useEffect(() => {
    if (isDialogOpen) dialogRef.current?.showModal()
    else {
      dialogRef.current?.close()
      setSteps(1)
    }
  }, [isDialogOpen])

  const renderSteps = () => {
    switch (step) {
      case 1:
        return (
          <EmailInputStep
            email={email}
            setEmail={setEmail}
            handleSubmit={e => {
              e.preventDefault()
              if (isExistAccountByEmail(email)) setSteps(2)
              else setSteps(4)
            }}
          />
        )
      case 2:
        return (
          <Authorization
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            setSteps={setSteps}
            handleSubmit={e => {
              e.preventDefault()
              if (getAccountByEmail(email)?.privacyInfo.password !== password) {
                return console.log('password is wrong')
              }
              login(email)
              setIsDialogOpen(false)
            }}
          />
        )
      case 3:
        return (
          <EmailSended
            handleSubmit={e => {
              e.preventDefault()
              setIsDialogOpen(false)
            }}
          />
        )
      case 4:
        return (
          <Registration
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            handleSubmit={e => {
              e.preventDefault()
              if (getAccountByEmail(email)) {
                return console.log('email is already exist')
              }
              addAccount({ email, password })
              setIsDialogOpen(false)
            }}
          />
        )
      default:
        setSteps(1)
        return null
    }
  }
  return (
    <dialog
      ref={dialogRef}
      onClick={e => (e.target as HTMLElement).tagName === 'DIALOG' && setIsDialogOpen(false)}
      className='registration-dialog'>
      <Image
        src='/character.png'
        width={298.06}
        height={261.84}
        alt='character'
      />

      <div className='wrapper'>
        <button onClick={() => setIsDialogOpen(false)}>
          {isMobile ? <ArrowDownMobile alt='close' /> : <Close alt='close' />}
        </button>
        {renderSteps()}
      </div>
    </dialog>
  )
}
