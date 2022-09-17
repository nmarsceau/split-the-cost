import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from 'AppContext'
import { Input, VibrateButton } from 'Elements';

export function Participant({ id }) {
    const data = useContext(AppContext)
    const navigate = useNavigate()

    const setName = name => {
        const error = Object.values(data.participants).find(p => p.name === name)
            ? 'Name must be unique.'
            : ''
        data.setParticipants(participants => {
            participants[id]['name'] = name
            participants[id]['error'] = error
            return {...participants}
        })
    }

    const setAmount = amount => {
        data.setParticipants(participants => {
            participants[id]['amount'] = amount
            return {...participants}
        })
    }

    const remove = () => {
        data.setParticipants(participants => {
            delete participants[id]
            return {...participants}
        })
    }

    const p = data.participants[id], split = () => navigate('/split')
    return (
        <div id={'participant-' + id} className="ui segment participant">
            <label htmlFor={'name-' + id} className="hiddenVisually">Name</label>
            <Input id={'name-' + id} placeholder="Name" value={p.name} onChange={e => setName(e.target.value)} onEnter={split} />
            <VibrateButton className="ui big red icon button removeButton" onClick={remove} vibrationPattern="50">
                <label className="hiddenVisually">Remove</label>
                <i className="trash icon"></i>
            </VibrateButton>
            <div className="amountInputContainer">
                <small>spent</small>
                <label htmlFor={'amount-' + id} className="hiddenVisually">Amount</label>
                <div className="ui labeled input">
                    <label htmlFor={'amount-' + id} className="ui label">$</label>
                    <Input type="number" id={'amount-' + id} value={p.amount} onChange={e => setAmount(e.target.value)} onEnter={split} />
                </div>
            </div>
            {p.error && <div>{p.error}</div>}
        </div>
    )
}