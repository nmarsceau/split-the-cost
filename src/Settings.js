import { Link } from 'react-router-dom'
import { ParticipantContext } from 'Participants'
import { Header } from 'Header'

export function Settings() {
    return (
        <ParticipantContext.Consumer>
            {(context) => (
                <div className="appLayout">
                    <Header showSettings={false} />
                    <div className="settings listContainer">
                        <h2>Settings</h2>
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
                        >
                            <i className="arrow left icon"></i>
                            Back
                        </Link>
                    </div>
                </div>
            )}
        </ParticipantContext.Consumer>
    )
}