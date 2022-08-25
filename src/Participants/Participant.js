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
                    <li id={'participant-' + id}>
                        <label>
                            Name
                            <input value={p.name} onChange={e => setName(e.target.value)} />
                        </label>
                        <label>
                            Amount
                            <input type="number" value={p.amount} onChange={e => setAmount(e.target.value)} />
                        </label>
                        <button onClick={remove}>Remove</button>
                        {p.error && <div>{p.error}</div>}
                    </li>
                )
            }}
        </ParticipantContext.Consumer>
    )
}