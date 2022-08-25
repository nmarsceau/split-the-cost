export const formatCurrency = cents => {
    const dollars = Math.floor(cents / 100)
    cents = String(cents % 100).padStart(2, '0')
    return `$${dollars}.${cents}`
}