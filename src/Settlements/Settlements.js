import { useContext } from 'react'
import { AppContext } from 'AppContext'
import { Settlement } from 'Settlements'
import { splitCost, formatCurrency, randomString } from 'Utilities'
import { Header, VibrateButton } from 'Elements'

export function Settlements() {
    const data = useContext(AppContext)

    const { settlements, total, amountPerParticipant } = splitCost(Object.values(data.participants).map(p => ({
        name: p.name,
        amount: p.amount
    })))

    return (
        <div className="appLayout settlements">
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
                        <Settlement payer={s.payer} amount={s.amount} receiver={s.receiver} key={randomString()} />
                    ))}
                </div>
            </div>
            <div className="primaryButtonContainer">
                <VibrateButton type="link" to="/" className="ui massive fluid teal button" vibrationPattern="100">
                    <span><i className="arrow left icon"></i></span>
                    <span>Back</span>
                </VibrateButton>
            </div>
        </div>
    )
}