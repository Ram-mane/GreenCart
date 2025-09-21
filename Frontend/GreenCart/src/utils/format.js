export function toCurrency(n) {
  if (n == null) return '—'
  return '₹' + Number(n).toLocaleString('en-IN')
}
