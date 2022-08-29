import headerLogo from 'logo/logo-64.png'

export function Header() {
    return (
        <div className="header">
            <img src={headerLogo} alt="" className="headerLogo" />
            <h1>Split The Cost</h1>
        </div>
    )
}