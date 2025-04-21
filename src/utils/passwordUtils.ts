export type TPasswordStrength = 1 | 2 | 3 | 4
export type TPasswordStrengthName = 'Слабый' | 'Средний' | 'Надёжный' | 'Очень сильный'

export const getPasswordStrength = (password: string): TPasswordStrength => {
  let strength = 1

  if (password.length >= 8) strength++ // long
  if (/[A-Z]/.test(password)) strength++ // uppercase
  if (/\d/.test(password)) strength++ // digits
  if (/[^A-Za-z0-9]/.test(password)) strength++ // spec chars

  return Math.min(strength, 4) as TPasswordStrength
}

export const getPasswordStrengthName = (passwordStrength: TPasswordStrength): string => {
  switch (passwordStrength) {
    case 1:
      return 'Слабый'
    case 2:
      return 'Средний'
    case 3:
      return 'Надёжный'
    case 4:
      return 'Очень сильный'
  }
}
