import { VibrateButton } from 'Elements'

export function Header() {
    const showSettings = window.location.pathname !== '/settings'

    return (
        <div className="headerContainer">
            <header className="header">
                <img src={process.env.PUBLIC_URL + 'logo/logo-64.png'} alt="" className="headerLogo" />
                <h1>Split The Cost</h1>
            </header>
            {showSettings &&
                <VibrateButton type="link" to="/settings" className="ui big teal icon button settingsButton" vibrationPattern="100">
                    <label className="hiddenVisually">Settings</label>
                    <i className="cog icon"></i>
                </VibrateButton>
            }
        </div>
    )
}