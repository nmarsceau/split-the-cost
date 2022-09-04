import { Link } from 'react-router-dom'
import { ParticipantContext, Participant } from 'Participants'
import { Header } from 'Header'

export function ParticipantList() {
    return (
        <ParticipantContext.Consumer>
            {(context) => (
                <div className="appLayout">
                    <Header />
                    <div className="participants listContainer">
                        <div className="participantList">
                            {Object.keys(context.participants).map(id => <Participant key={id} id={id} />)}
                        </div>
                        <div className="participantListButtons">
                            <button type="button" className="ui very rounded large teal icon button" onClick={context.addNewParticipant}>
                                <i className="plus icon"></i>&nbsp;Add Participant
                            </button>
                            <button type="button" className="ui very rounded large red icon button" onClick={context.resetParticipants}>
                                <i className="undo alternate icon"></i>&nbsp;Reset
                            </button>
                        </div>
                    </div>
                    <div className="buttonContainer">
                        <Link to="/split" className="ui very rounded massive teal button splitButton" onClick={() => {window.navigator.vibrate(300)}}>SPLIT IT</Link>
                    </div>
                </div>
            )}
        </ParticipantContext.Consumer>
    )
}