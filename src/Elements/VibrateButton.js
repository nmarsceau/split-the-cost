import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from 'AppContext'

export function VibrateButton({ type = 'button', className, onClick, children, to, vibrationPattern, disabled = false }) {
    const data = useContext(AppContext)
    const commonProps = {className, onClick: () => {
        data.settings.vibration.value && window.navigator.vibrate(vibrationPattern)
        if (onClick instanceof Function) {onClick()}
    }}
    if (disabled) {commonProps.disabled = "disabled"}

    if (type === 'link') {
        return <Link to={to} {...commonProps}>{children}</Link>
    } else {
        return <button type="button" {...commonProps}>{children}</button>
    }
}