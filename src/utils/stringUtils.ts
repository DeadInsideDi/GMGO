// const alfabetTranscription = {
//   а: 'a',
//   б: 'b',
//   в: 'v',
//   г: 'g',
//   д: 'd',
//   е: 'e',
//   ё: 'e',
//   ж: 'zh',
//   з: 'z',
//   и: 'i',
//   й: 'y',
//   к: 'k',
//   л: 'l',
//   м: 'm',
//   н: 'n',
//   о: 'o',
//   п: 'p',
//   р: 'r',
//   с: 's',
//   т: 't',
//   у: 'u',
//   ф: 'f',
//   х: 'h',
//   ц: 'ts',
//   ч: 'ch',
//   ш: 'sh',
//   щ: 'shch',
//   ъ: '',
//   ы: 'y',
//   ь: '',
//   э: 'e',
//   ю: 'yu',
//   я: 'ya',
//   ' ': '-',
// }

// type AlphabetKey = keyof typeof alfabetTranscription
// const keys: AlphabetKey[] = Object.keys(alfabetTranscription) as AlphabetKey[]

// export const rusToUrl = (str: string) =>
//   Array.from(str.toLowerCase().replace(/[\W]/g, ''), char =>
//     keys.includes(char as AlphabetKey) ? alfabetTranscription[char as AlphabetKey] : char,
//   ).join('')
// console.log(rusToUrl('Привет, мир!'))

export const stringArticlesByInt = (integer: number) => {
  if (integer === 0) return `нет статей`

  const integerString = integer
  if (integer > 20) integer %= 10
  if (integer < 5) {
    if (integer === 0) return `${integerString} статей`
    if (integer === 1) return `${integerString} статья`
    return `${integerString} статьи`
  }
  return `${integerString} статей`
}
