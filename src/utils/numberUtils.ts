export const compactNumber = (number: number) => {
  return Intl.NumberFormat('en-EN', {
    notation: 'compact',
    useGrouping: true,
    maximumFractionDigits: 1,
  }).format(number)
}

const formatter = new Intl.RelativeTimeFormat('ru-RU', { numeric: 'auto' })
const units: [Intl.RelativeTimeFormatUnit, number][] = [
  ['second', 1],
  ['minute', 60],
  ['hour', 3600],
  ['day', 86400],
  ['week', 604800],
  ['month', 2592000],
  ['year', 31536000],
]
const lengthUnits = units.length

export const formatDate = (timeUnix: number) => {
  const diff = Date.now() / 1000 - timeUnix
  if (diff < 0) return 'ERROR'
  let i = 0
  while (i < lengthUnits) {
    if (diff < units[i + 1][1]) return formatter.format(-~~(diff / units[i][1]), units[i][0])
    i++
  }
  return 'just now'
}
