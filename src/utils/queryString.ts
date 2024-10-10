export function formatQueryString(filters: {
  [key: string]: any
}): string {
  if (!filters) {
    return ''
  }
  return Object.keys(filters)
    .filter(
      (key) => filters[key] !== '' && filters[key] !== undefined
    )
    .map((key) => `${key}=${encodeURIComponent(filters[key])}`)
    .join('&')
}
