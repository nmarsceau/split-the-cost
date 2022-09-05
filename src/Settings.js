import { Link } from 'react-router-dom'
import { ParticipantContext } from 'Participants'
import { Header } from 'Header'

export function Settings() {
    return (
        <ParticipantContext.Consumer>
            {(context) => (
                <div className="appLayout">
                    <Header />
                    <div className="listContainer">
                        <div className="settingsList">
                            <div className="setting">
                                <label htmlFor="vibration">Use vibration?</label>
                                <div className="ui toggle checkbox">
                                    <input type="checkbox" id="vibration" name="vibration"
                                        checked={context.settings.vibration.value}
                                        onChange={e => context.settings.vibration.set(e.target.checked)}
                                    />
                                    <label></label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="buttonContainer">
                        <Link to="/"
                            className="ui very rounded massive teal button"
                            onClick={() => context.settings.vibration.value && window.navigator.vibrate(300)}
                        >Back</Link>
                    </div>
                </div>
            )}
        </ParticipantContext.Consumer>
    )
}