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
                            <button type="button"
                                className="ui very rounded large teal icon button"
                                onClick={() => {
                                    context.settings.vibration.value && window.navigator.vibrate(100)
                                    context.addNewParticipant()
                                }}
                            >
                                <i className="plus icon"></i>&nbsp;Add Participant
                            </button>
                            <button type="button"
                                className="ui very rounded large red icon button"
                                onClick={() => {
                                    if (context.settings.vibration.value) {
                                        const vibratePattern = Object.keys(context.participants).reduce(pattern => [...pattern, 50, 30], [])
                                        window.navigator.vibrate(vibratePattern)
                                    }
                                    context.resetParticipants()
                                }}
                            >
                                <i className="undo alternate icon"></i>&nbsp;Reset
                            </button>
                        </div>
                    </div>
                    <div className="buttonContainer">
                        <Link to="/split"
                            className="ui very rounded massive teal button splitButton"
                            onClick={() => context.settings.vibration.value && window.navigator.vibrate(300)}
                        >
                            <img src={process.env.PUBLIC_URL + 'logo/logo-64-outline.png'} alt="" />
                            <span>SPLIT IT</span>
                        </Link>
                    </div>
                </div>
            )}
        </ParticipantContext.Consumer>
    )
}