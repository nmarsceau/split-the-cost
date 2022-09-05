import { useState } from 'react'
import { ParticipantContext } from 'Participants'
import { randomString, useLocalStorage } from 'Utilities'

export function ParticipantProvider({ children }) {
    const initializeParticipants = () => ({
        [randomString()]: {name: '', amount: 0}
    })

    const [participants, setParticipants] = useState(initializeParticipants())

    const addNewParticipant = () => {
        const existingIds = Object.keys(participants)
        let id = randomString()
        while (existingIds.includes(id)) {id = randomString()}
        setParticipants(participants => ({...participants, [id]: {name: '', amount: 0}}))
    }

    const resetParticipants = () => {
        setParticipants(initializeParticipants())
    }

    const [vibration, setVibration] = useLocalStorage('settings.vibration', false)

    const settings = {
        vibration: {value: vibration, set: setVibration}
    }
    
    return (
        <ParticipantContext.Provider value={{
            participants,
            setParticipants,
            addNewParticipant,
            resetParticipants,
            settings
        }}>{ children }</ParticipantContext.Provider>
    )
}