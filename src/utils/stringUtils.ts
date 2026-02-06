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
