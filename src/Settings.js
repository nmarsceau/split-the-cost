import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ParticipantContext } from 'Participants'
import { Header } from 'Header'
import { $ } from 'Utilities'

export function Settings() {
    let context = null;

    useEffect(() => {
        $(document).ready(() => {
            $('.vibrationCheckbox').checkbox({
                onChange: function() {
                    context.settings.vibration.set(this.checked)
                }
            })
        })
        // eslint-disable-next-line
    }, [])

    return (
        <ParticipantContext.Consumer>
            {(_context) => {
                context = _context

                const deleteGroup = groupName => {
                    context.settings.vibration.value && window.navigator.vibrate(50)
                    context.setGroups(groups => {
                        delete groups[groupName]
                        return {...groups}
                    })
                }

                return (
                    <div className="appLayout">
                        <Header showSettings={false} />
                        <div className="settings listContainer">
                            <h2>Settings</h2>
                            <div className="settingsList">
                                <div className="toggle setting">
                                    <label htmlFor="vibration">Use vibration?</label>
                                    <div className="ui toggle checkbox vibrationCheckbox">
                                        <input type="checkbox" id="vibration" name="vibration" checked={context.settings.vibration.value} onChange={() => {}} />
                                        <label></label>
                                    </div>
                                </div>
                                <div className="setting">
                                    <label>Groups</label>
                                    <div className="ui segments groupList">
                                        {Object.keys(context.groups).map(groupName => (
                                            <div className="ui segment group" key={groupName}>
                                                <div>
                                                    <div>{groupName}</div>
                                                    <div><small>{context.groups[groupName].join(', ')}</small></div>
                                                </div>
                                                <div>
                                                    <button type="button" className="ui red icon button" onClick={() => deleteGroup(groupName)}>
                                                        <label className="hiddenVisually">Delete Group</label>
                                                        <i className="trash icon"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                        {Object.keys(context.groups).length === 0 && <div className="ui segment"><i>No Groups Yet</i></div>}
                                    </div>
                                </div>
                            </div>
                            <div>{/* Placeholder */}</div>
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
                )
            }}
        </ParticipantContext.Consumer>
    )
}