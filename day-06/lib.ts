
export const splitGroups = (input: string): string[][] => input.split('\n\n').map(group => group.split('\n'))

export const findGroupUniqueAnswers = (input: string[]): Set<string> => {
  const uniqueAnswers = new Set<string>();
  input.forEach(answers => {
    answers.split('').forEach(answer => {
      uniqueAnswers.add(answer)
    })
  })
  return uniqueAnswers
}
export const findGroupCommonAnswers = (input: string[]) => {
  const commonAnswers = new Map<string, string[]>();
  input.forEach(answers => {
    answers.split('').forEach(answer => {
      if (!commonAnswers.has(answer)) {
        commonAnswers.set(answer, [answer])
      } else {
        commonAnswers.get(answer)?.push(answer)
      }
    })
  })
  Array.from(commonAnswers.entries()).forEach(([key,arr]) => {
    if (arr.length !== input.length) {
      commonAnswers.delete(key)
    }
    
  })
  return commonAnswers
}
