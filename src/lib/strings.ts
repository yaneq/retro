export const getNextRetroTitle = ({
  previousTitle = null,
}: {
  previousTitle?: string
}): string => {
  if (!previousTitle) return "retro #1"
  previousTitle = previousTitle.trim()
  const numberMatch = previousTitle.match(/[0-9]+$/)
  if (!numberMatch) return `${previousTitle} #2`
  const nextNumber = parseInt(numberMatch[0]) + 1
  return previousTitle.replace(/[0-9]+$/, nextNumber.toString())
}
