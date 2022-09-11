import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ParticipantContext, Participant } from 'Participants'
import { Header } from 'Header'
import { $, listsEqual } from 'Utilities'

export function ParticipantList() {
    let context = null;

    const [groupName, setGroupName] = useState('')
    const [groupNameError, setGroupNameError] = useState('')
    const [duplicateGroupName, setDuplicateGroupName] = useState(false)

    const saveGroup = () => {
        let foundErrors = false
        const _groupName = groupName.trim()
        if (_groupName === '') {
            setGroupNameError('Group Name may not be empty.')
            foundErrors = true
        }
        else {setGroupNameError('')}
        if (foundErrors) {return false}
        context.setGroups(groups => ({
            ...groups,
            [_groupName]: Object.values(context.participants).map(p => p.name).filter(n => n !== '')
        }))
    }

    useEffect(() => {
        $(document).ready(() => {
            $('.dropdown').dropdown()
            $('.groupNameModal').modal({detachable: false})
        })
        // eslint-disable-next-line
    }, [])

    return (
        <ParticipantContext.Consumer>
            {(_context) => {
                context = _context
                let matchingGroupName = null
                const currentGroupPeople = Object.values(context.participants).map(p => p.name).filter(n => n !== '')
                for (const groupName in context.groups) {
                    if (listsEqual(currentGroupPeople, context.groups[groupName])) {
                        matchingGroupName = groupName
                        break
                    }
                }
                const saveGroupDisabled = matchingGroupName === null && currentGroupPeople.length > 0 ? {} : {disabled: 'disabled'};
                return (
                    <div className="appLayout">
                        <Header />
                        <div className="listContainer">
                            <h2 className="groupName">{matchingGroupName}</h2>
                            <div className="participantList">
                                {Object.keys(context.participants).map(id => <Participant key={id} id={id} />)}
                            </div>
                            <div className="participantListButtons">
                                <div className="ui very rounded buttons">
                                    <button type="button"
                                        className="ui teal icon button"
                                        onClick={() => {
                                            context.settings.vibration.value && window.navigator.vibrate(100)
                                            context.addNewParticipant()
                                        }}
                                    >
                                        <i className="plus icon"></i>&nbsp;Add Person
                                    </button>
                                    <button type="button" className="ui teal icon bottom floating scrolling dropdown button groupButton">
                                        <label className="hiddenVisually">Choose a Group</label>
                                        <i className="users icon"></i>
                                        <div className="menu">
                                            <div className="header">Groups</div>
                                            {Object.keys(context.groups).map(groupName => (
                                                <div className="vertical item" key={groupName} onClick={() => context.useGroup(groupName)}>
                                                    <div className="description">{context.groups[groupName].join(', ')}</div>
                                                    <div className="text">{groupName}</div>
                                                </div>
                                            ))}
                                            {Object.keys(context.groups).length === 0 && <div className="item disabled"><i>No Groups Yet</i></div>}
                                        </div>
                                    </button>
                                </div>
                                <button type="button"
                                    className="ui very rounded blue icon button"
                                    onClick={() => {
                                        context.settings.vibration.value && window.navigator.vibrate(100)
                                        setGroupName('')
                                        setGroupNameError('')
                                        setDuplicateGroupName(false)
                                        $('.groupNameModal').modal('show')
                                    }}
                                    {...saveGroupDisabled}
                                >
                                    <i className="save icon"></i>
                                    &nbsp;Save Group
                                </button>
                                <button type="button"
                                    className="ui very rounded red icon button"
                                    onClick={() => {
                                        if (context.settings.vibration.value) {
                                            const vibratePattern = Object.keys(context.participants).reduce(pattern => [...pattern, 50, 30], [])
                                            window.navigator.vibrate(vibratePattern)
                                        }
                                        context.resetParticipants()
                                    }}
                                >
                                    <label className="hiddenVisually">Reset Participants</label>
                                    <i className="undo alternate icon"></i>
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
                        <div className="ui mini modal groupNameModal">
                            <div className="content">
                                <label htmlFor="groupName" className="hiddenVisually">Group Name</label>
                                <input type="text" id="groupName" name="groupName" placeholder="Group Name"
                                    value={groupName} onChange={e => {
                                        setGroupName(e.target.value)
                                        setDuplicateGroupName(Object.keys(context.groups).includes(e.target.value))
                                    }}
                                    onKeyUp={e => {
                                        if (e.key === 'Enter') {
                                            e.target.closest('.ui.modal').querySelector('.ui.ok.button').click()
                                        }
                                    }}
                                />
                                {duplicateGroupName && <div className="duplicateGroupName"><span className="ui warning text">This will overwrite the existing<br />"{groupName}" group.</span></div>}
                                {groupNameError && <div className="groupNameError"><span className="ui error text">{groupNameError}</span></div>}
                            </div>
                            <div className="actions">
                                <button type="button" className="ui red icon cancel button"><i className="undo alternate icon"></i>&nbsp;Cancel</button>
                                <button type="button" className="ui teal icon ok button" onClick={saveGroup}><i className="save icon"></i>&nbsp;Save</button>
                            </div>
                        </div>
                    </div>
                )
            }}
        </ParticipantContext.Consumer>
    )
}