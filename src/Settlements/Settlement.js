import { formatCurrency } from 'Utilities'

export function Settlement({ payer, amount, receiver }) {
    let emoji, message
    if (amount === 0 && receiver === null) {
        emoji = ':sunglasses:'
        message = <div>{payer} is even.</div>
    }
    else {
        emoji = ':money_with_wings:'
        message = <div>{payer}, pay {receiver} {formatCurrency(amount)}.</div>
    }
    return (
        <div className="ui segment settlement">
            <em data-emoji={emoji} className="medium"></em>
            {message}
        </div>
    )
}