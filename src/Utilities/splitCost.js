export const splitCost = participants => {
    let total = 0
    participants.forEach(p => {
        // Convert decimal money values to an integer number of cents.
        // Money values are easier to handle this way.
        p.amount = Math.round(p.amount * 100)
        total += p.amount
    })
    const
        amountPerParticipant = Math.round(total / participants.length),
        payers = [],
        receivers = [],
        settlements = []
    participants.forEach(p => {
        const amountOwed = amountPerParticipant - p.amount
        if (amountOwed < 0) {
            receivers.push({
                name: p.name,
                amount: amountOwed * -1
            })
        }
        else if (amountOwed > 0) {
            payers.push({
                name: p.name,
                amount: amountOwed
            })
        }
        else {
            // If this participant owes nothing, they can go ahead and be added to the settlements
            settlements.push({
                payer: p.name,
                amount: 0,
                receiver: null
            })
        }
    })
    _payers: for (const p of payers) {
        for (const r of receivers) {
            const amountToPay = Math.min(p.amount, r.amount)
            p.amount -= amountToPay
            r.amount -= amountToPay
            settlements.push({
                payer: p.name,
                amount: amountToPay,
                receiver: r.name
            })
            if (Math.round(p.amount) === 0) {continue _payers}
        }
    }
    return {
        settlements,
        total,
        amountPerParticipant
    }
}
