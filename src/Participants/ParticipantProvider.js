import { useState } from 'react'
import { ParticipantContext } from 'Participants'
import { randomString } from 'Utilities'

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
    
    return (
        <ParticipantContext.Provider value={{
            participants,
            setParticipants,
            addNewParticipant,
            resetParticipants
        }}>{ children }</ParticipantContext.Provider>
    )
}