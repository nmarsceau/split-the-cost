import { ParticipantContext } from 'Participants'

export function Participant({ id }) {
    let context = null;

    const setName = name => {
        const error = Object.values(context.participants).find(p => p.name === name)
            ? 'Name must be unique.'
            : ''
        context.setParticipants(participants => {
            participants[id]['name'] = name
            participants[id]['error'] = error
            return {...participants}
        })
    }

    const setAmount = amount => {
        context.setParticipants(participants => {
            participants[id]['amount'] = amount
            return {...participants}
        })
    }

    const remove = () => {
        context.setParticipants(participants => {
            delete participants[id]
            return {...participants}
        })
    }

    return (
        <ParticipantContext.Consumer>
            {(_context) => {
                context = _context
                const p = context.participants[id]
                return (
                    <div id={'participant-' + id} className="ui segment participant">
                        <label htmlFor={'name-' + id} className="hiddenVisually">Name</label>
                        <input type="text" id={'name-' + id} placeholder="Name" value={p.name} onChange={e => setName(e.target.value)} />
                        <button type="button" className="ui big red icon button removeButton" onClick={remove}>
                            <label className="hiddenVisually">Remove</label>
                            <i className="times icon"></i>
                        </button>
                        <div className="amountInputContainer">
                            <span>spent</span>
                            <label htmlFor={'amount-' + id} className="hiddenVisually">Amount</label>
                            <div className="ui labeled input">
                                <label htmlFor={'amount-' + id} className="ui label">$</label>
                                <input type="number" id={'amount-' + id} value={p.amount} onChange={e => setAmount(e.target.value)} />
                            </div>
                        </div>
                        {p.error && <div>{p.error}</div>}
                    </div>
                )
            }}
        </ParticipantContext.Consumer>
    )
}