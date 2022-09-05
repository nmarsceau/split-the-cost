import { Link } from 'react-router-dom'
import { ParticipantContext } from 'Participants'

export function Header() {
    return (
        <ParticipantContext.Consumer>
            {(context) => (
                <div className="headerContainer">
                    <header className="header">
                        <img src={process.env.PUBLIC_URL + 'logo/logo-64.png'} alt="" className="headerLogo" />
                        <h1>Split The Cost</h1>
                    </header>
                    <div>
                        <Link to="/settings"
                            className="ui big teal icon button settingsButton"
                            onClick={() => context.settings.vibration.value && window.navigator.vibrate(100)}
                        >
                            <label className="hiddenVisually">Settings</label>
                            <i className="cog icon"></i>
                        </Link>
                    </div>
                </div>
            )}
        </ParticipantContext.Consumer>
    )
}