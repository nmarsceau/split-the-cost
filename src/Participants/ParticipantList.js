import { Link } from 'react-router-dom'
import { ParticipantContext, Participant } from 'Participants'

export function ParticipantList() {
    return (
        <ParticipantContext.Consumer>
            {(context) => (
                <div className="participantListContainer">
                    <ul className="participantList">
                        {Object.keys(context.participants).map(id => <Participant key={id} id={id} />)}
                    </ul>
                    <button onClick={context.addNewParticipant}>New Participant</button>
                    <button onClick={context.resetParticipants}>Reset</button>
                    <Link to="/split">SPLIT IT</Link>
                </div>
            )}
        </ParticipantContext.Consumer>
    )
}