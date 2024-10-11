export const areTimesConsecutive = (times: string[]) => {
  const sortedTimes = times
    .map((time) => parseInt(time.replace(':', '')))
    .sort((a, b) => a - b)

  for (let i = 1; i < sortedTimes.length; i++) {
    if (sortedTimes[i] - sortedTimes[i - 1] !== 100) {
      return false
    }
  }

  return true
}

export function addOneHour(time: string): string {
  // eslint-disable-next-line prefer-const
  let [hours, minutes] = time.split(':').map(Number)

  hours += 1

  if (hours === 24) {
    hours = 0
  }

  const formattedHours = String(hours).padStart(2, '0')
  const formattedMinutes = String(minutes).padStart(2, '0')

  return `${formattedHours}:${formattedMinutes}`
}
