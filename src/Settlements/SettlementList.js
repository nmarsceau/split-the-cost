import { Link } from 'react-router-dom'
import { ParticipantContext } from 'Participants'
import { Settlement } from 'Settlements'
import { splitCost, formatCurrency } from 'Utilities'

export function SettlementList() {
    return (
        <ParticipantContext.Consumer>
            {(context) => {
                const { settlements, total, amountPerParticipant } = splitCost(Object.values(context.participants).map(p => ({
                    name: p.name,
                    amount: p.amount
                })))
                return (
                    <div className="settlementListContainer">
                        <Link to="/">Back</Link>
                        <div>Total Spent: {formatCurrency(total)}</div>
                        <div>Amount Per Participant: {formatCurrency(amountPerParticipant)}</div>
                        <ul className="settlementList">
                            {settlements.map(s => (
                                <li key={s.payer + s.receiver}>
                                    <Settlement payer={s.payer} amount={s.amount} receiver={s.receiver} />
                                </li>
                            ))}
                        </ul>
                    </div>
                )
            }}
        </ParticipantContext.Consumer>
    )
}