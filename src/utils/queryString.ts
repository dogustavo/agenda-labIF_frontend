export function formatQueryString(filters: {
  [key: string]: any
}): string {
  if (!filters) {
    return ''
  }
  return Object.keys(filters)
    .map((key) => `${key}=${encodeURIComponent(filters[key])}`)
    .join('&')
}
