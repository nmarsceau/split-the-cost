export function Header() {
    return (
        <div className="header">
            <img src={process.env.PUBLIC_URL + 'logo/logo-64.png'} alt="" className="headerLogo" />
            <h1>Split The Cost</h1>
        </div>
    )
}