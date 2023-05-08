// Shorthand for getting an ISO string for Date.now()
export function getIsoNow() {
  return new Date(Date.now()).toISOString()
}

// Shorthand for getting any date as a legible string
export function parseDateAsString(date?: string) {
  return date ? new Date(date).toLocaleDateString() : undefined
}

// Shorthand for taking a date and ***_by value and getting a projected date
export function calculateDateFromBy(date: number, by: number) {
  return new Date(date + by * 3_600_000)
}
