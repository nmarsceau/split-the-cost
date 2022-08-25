import { formatCurrency } from 'Utilities'

export function Settlement({ payer, amount, receiver }) {
    if (amount === 0 && receiver === null) {
        return <div>&#128526; {payer} is even.</div>
    }
    else {
        return <div>&#128184; {payer}, pay {receiver} {formatCurrency(amount)}.</div>
    }
}