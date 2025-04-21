import Link from 'next/link'
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { Hide, Instagram, Odnoklassniki, See, Telegram, Twitter, VK, YouTube } from '../../../public'
import { getPasswordStrength, getPasswordStrengthName } from '../../utils/passwordUtils'
import './Form.scss'

export type TEmailInputProps = {
  setEmail: Dispatch<SetStateAction<string>>
  email: string
  handleSubmit: (event: React.FormEvent) => void
}

export const EmailInputStep: FC<TEmailInputProps> = ({ email, setEmail, handleSubmit }) => {
  return (
    <>
      <h2>Войди или зарегистрируйся</h2>
      <div className='social-buttons'>
        <button>
          <VK alt='VK' />
        </button>
        <button>
          <Instagram alt='instagram' />
        </button>
        <button>
          <YouTube alt='youTube' />
        </button>
        <button>
          <Twitter alt='twitter' />
        </button>
        <button>
          <Odnoklassniki alt='odnoklassniki' />
        </button>
        <button>
          <Telegram alt='telegram' />
        </button>
      </div>
      <form
        onSubmit={handleSubmit}
        className='email-input'>
        <div className='input-container'>
          <input
            id='email'
            type='email'
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            pattern='^[^@]+@[^@]+\.[^@]+$'
          />
          <label htmlFor='email'>E-mail</label>
        </div>
        <button type='submit'>Продолжить</button>
      </form>
      <p className='terms'>
        Регистрируясь или авторизуясь, вы соглашаетесь с условиями{' '}
        <Link
          className='primary-link'
          href='/about/polzovatelskoe-soglashenie'>
          Пользовательского соглашения
        </Link>{' '}
        и{' '}
        <Link
          className='primary-link'
          href='/about/politika-konfidencialnosti'>
          Политики конфиденциальности
        </Link>
      </p>
    </>
  )
}

export type TAuthorizationProps = {
  setEmail: Dispatch<SetStateAction<string>>
  email: string
  setPassword: Dispatch<SetStateAction<string>>
  password: string
  setSteps: Dispatch<SetStateAction<number>>
  handleSubmit: (event: React.FormEvent) => void
}

export const Authorization: FC<TAuthorizationProps> = ({
  email,
  setEmail,
  password,
  setPassword,
  setSteps,
  handleSubmit,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  return (
    <>
      <h2>Введите пароль</h2>
      <form
        onSubmit={handleSubmit}
        className='authorization'>
        <div className='input-container'>
          <input
            id='email'
            type='email'
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            pattern='^[^@]+@[^@]+\.[^@]+$'
          />
          <label htmlFor='email'>E-mail</label>
        </div>

        <div className='input-container'>
          <input
            id='password'
            type={isPasswordVisible ? 'text' : 'password'}
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <label htmlFor='password'>Пароль</label>
          <button
            type='button'
            onClick={() => setIsPasswordVisible(prev => !prev)}
            aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}>
            {isPasswordVisible ? <See /> : <Hide />}
          </button>
        </div>

        <button
          aria-label='Forgot password'
          className='primary-link'
          type='button'
          onClick={() => setSteps(3)}>
          Забыли пароль?
        </button>
        <button type='submit'>Войти</button>
      </form>
      <p className='terms'>
        Регистрируясь или авторизуясь, вы соглашаетесь с условиями{' '}
        <Link
          className='primary-link'
          href='/about/polzovatelskoe-soglashenie'>
          Пользовательского соглашения
        </Link>{' '}
        и{' '}
        <Link
          className='primary-link'
          href='/about/politika-konfidencialnosti'>
          Политики конфиденциальности
        </Link>
      </p>
    </>
  )
}

export type TEmailSendedProps = {
  handleSubmit: (event: React.FormEvent) => void
}

export const EmailSended: FC<TEmailSendedProps> = ({ handleSubmit }) => {
  return (
    <>
      <h2>Письмо отправлено!</h2>
      <form
        onSubmit={handleSubmit}
        className='email-sended'>
        <p>Перейдите по ссылке, отправленной на e&#8209;mail, чтобы завершить восстановление пароля</p>
        <button type='submit'>Закрыть окно</button>
      </form>
    </>
  )
}

export type TRegistrationProps = {
  setEmail: Dispatch<SetStateAction<string>>
  email: string
  setPassword: Dispatch<SetStateAction<string>>
  password: string
  handleSubmit: (event: React.FormEvent) => void
}

export const Registration: FC<TRegistrationProps> = ({ email, setEmail, password, setPassword, handleSubmit }) => {
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  let passwordStrength = getPasswordStrength(password)
  useEffect(() => {
    passwordStrength = getPasswordStrength(password)

    if (password !== confirmPassword) {
      console.log('passwords do not match')
    }
  }, [password, confirmPassword])

  return (
    <>
      <h2>Регистрация</h2>
      <form
        onSubmit={handleSubmit}
        className='registration'>
        <div className='input-container'>
          <input
            id='email'
            type='email'
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            pattern='^[^@]+@[^@]+\.[^@]+$'
          />
          <label htmlFor='email'>E-mail</label>
        </div>
        <div className='input-container'>
          <input
            id='password'
            type={isPasswordVisible ? 'text' : 'password'}
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <label htmlFor='password'>Придумайте пароль</label>
          <button
            type='button'
            onClick={() => setIsPasswordVisible(prev => !prev)}
            aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}>
            {isPasswordVisible ? <See /> : <Hide />}
          </button>
        </div>
        <div
          className='password-strength'
          style={{ '--password-strength-color': `var(--status-color-${passwordStrength})` } as React.CSSProperties}>
          {getPasswordStrengthName(passwordStrength)}
          <div className='marks'>
            {Array.from({ length: passwordStrength }).map((_, i) => (
              <div
                key={i}
                className='mark--active'
              />
            ))}
            {Array.from({ length: 4 - passwordStrength }).map((_, i) => (
              <div
                key={i}
                className='mark'
              />
            ))}
          </div>
        </div>
        <div className='input-container'>
          <input
            id='confirmPassword'
            type={isPasswordVisible ? 'text' : 'password'}
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            pattern={password}
            required
          />
          <label htmlFor='confirmPassword'>Подтвердите пароль</label>
          <button
            type='button'
            onClick={() => setIsPasswordVisible(prev => !prev)}
            aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}>
            {isPasswordVisible ? <See /> : <Hide />}
          </button>
        </div>
        <button type='submit'>Зарегистрироваться</button>
      </form>
      <p className='terms'>
        Регистрируясь или авторизуясь, вы соглашаетесь с условиями{' '}
        <Link
          className='primary-link'
          href='/about/polzovatelskoe-soglashenie'>
          Пользовательского соглашения
        </Link>{' '}
        и{' '}
        <Link
          className='primary-link'
          href='/about/politika-konfidencialnosti'>
          Политики конфиденциальности
        </Link>
      </p>
    </>
  )
}
