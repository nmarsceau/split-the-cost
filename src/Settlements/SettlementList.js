import { Link } from 'react-router-dom'
import { ParticipantContext } from 'Participants'
import { Settlement } from 'Settlements'
import { splitCost, formatCurrency, randomString } from 'Utilities'
import { Header } from 'Header'

export function SettlementList() {
    return (
        <ParticipantContext.Consumer>
            {(context) => {
                const { settlements, total, amountPerParticipant } = splitCost(Object.values(context.participants).map(p => ({
                    name: p.name,
                    amount: p.amount
                })))
                return (
                    <div className="appLayout">
                        <Header />
                        <div className="listContainer">
                            <dl className="settlementDetails">
                                <dt key="totalSpentTitle">Total Spent</dt>
                                <dd key="totalSpentData">{formatCurrency(total)}</dd>
                                <dt key="amountPerParticipantTitle">Amount Per Participant</dt>
                                <dd key="amountPerParticipantData">{formatCurrency(amountPerParticipant)}</dd>
                            </dl>
                            <div className="settlementList">
                                {settlements.map(s => (
                                    <Settlement payer={s.payer} amount={s.amount} receiver={s.receiver} key={randomString} />
                                ))}
                            </div>
                            <div>{/* Placeholder */}</div>
                        </div>
                        <div className="buttonContainer">
                            <Link to="/"
                                className="ui very rounded massive teal button"
                                onClick={() => context.settings.vibration.value && window.navigator.vibrate(100)}
                            >
                                <i className="arrow left icon"></i>
                                Back
                            </Link>
                        </div>
                    </div>
                )
            }}
        </ParticipantContext.Consumer>
    )
}