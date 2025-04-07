export const compactNumber = (number: number) => {
  return Intl.NumberFormat('en-EN', {
    notation: 'compact',
    useGrouping: true,
    maximumFractionDigits: 1,
  }).format(number)
}
