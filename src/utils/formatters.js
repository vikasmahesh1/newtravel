const currencyFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
})

const dateTimeFormatter = new Intl.DateTimeFormat('en-IN', {
  day: 'numeric',
  month: 'short',
  hour: '2-digit',
  minute: '2-digit',
  hour12: true,
})

export const formatINRCurrency = (value) => currencyFormatter.format(value)
export const formatDateTime = (isoString) => dateTimeFormatter.format(new Date(isoString))
