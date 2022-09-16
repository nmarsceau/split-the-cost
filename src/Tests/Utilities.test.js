import { render, screen } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import { formatCurrency, listsEqual, randomString, splitCost, useLocalStorage } from 'Utilities'

test('formatCurrency works correctly', () => {
    expect(formatCurrency(0)).toEqual('$0.00')
    expect(formatCurrency(1)).toEqual('$0.01')
    expect(formatCurrency(10)).toEqual('$0.10')
    expect(formatCurrency(100)).toEqual('$1.00')
    expect(formatCurrency(123)).toEqual('$1.23')
    expect(formatCurrency(214)).toEqual('$2.14')
    expect(formatCurrency(6000)).toEqual('$60.00')
    expect(formatCurrency(7180)).toEqual('$71.80')
    expect(formatCurrency(20040)).toEqual('$200.40')
    expect(formatCurrency(45829)).toEqual('$458.29')
})

test('listsEqual works correctly', () => {
    expect(listsEqual([], [])).toEqual(true)
    expect(listsEqual([], [4])).toEqual(false)
    expect(listsEqual([3, 4], [3, 4])).toEqual(true)
    expect(listsEqual([3, 4], [4, 3])).toEqual(true)
    expect(listsEqual(['Harry', 'Ron', 'Hermione'], ['Hermione', 'Harry', 'Ron'])).toEqual(true)
    expect(listsEqual(['Snape', 'Hagrid', 'McGonagall'], ['Snape', 'Hagrid', 'Dumbledore'])).toEqual(false)
    expect(listsEqual(['Lucius', 'Narcissa', 'Draco'], ['Lucius', 'Narcissa', 'Draco', 'Bellatrix'])).toEqual(false)
})

test('randomString works correctly', () => {
    const string = randomString()
    expect(typeof string).toEqual('string')
    expect(string.length).toBeGreaterThan(5)
})

test('splitCost - no participants', () => {
    const { settlements, total, amountPerParticipant } = splitCost([])

    expect(total).toEqual(0)
    expect(amountPerParticipant).toEqual(0)
    expect(settlements).toBeInstanceOf(Array)
    expect(settlements.length).toEqual(0)
})

test('splitCost - single, blank participant', () => {
    const { settlements, total, amountPerParticipant } = splitCost([{name: 'Neville', amount: 0}])

    expect(total).toEqual(0)
    expect(amountPerParticipant).toEqual(0)
    expect(settlements).toBeInstanceOf(Array)
    expect(settlements.length).toEqual(1)

    expect(settlements[0].payer).toEqual('Neville')
    expect(settlements[0].receiver).toBeNull()
    expect(settlements[0].amount).toEqual(0)
})

test('splitCost - 2 participants', () => {
    const { settlements, total, amountPerParticipant } = splitCost([
        {name: 'Harry', amount: 240.23},
        {name: 'Ron', amount: 0}
    ])

    expect(total).toEqual(24023)
    expect(amountPerParticipant).toEqual(12012)
    expect(settlements).toBeInstanceOf(Array)
    expect(settlements.length).toEqual(1)

    expect(settlements[0].payer).toEqual('Ron')
    expect(settlements[0].receiver).toEqual('Harry')
    expect(settlements[0].amount).toEqual(12011)
})

test('splitCost - 3 participants', () => {
    const { settlements, total, amountPerParticipant } = splitCost([
        {name: 'Harry', amount: 6.78},
        {name: 'Ron', amount: 7.45},
        {name: 'Hermione', amount: 8.35}
    ])

    expect(total).toEqual(2258)
    expect(amountPerParticipant).toEqual(753)
    expect(settlements).toBeInstanceOf(Array)
    expect(settlements.length).toEqual(2)

    expect(settlements[0].payer).toEqual('Harry')
    expect(settlements[0].receiver).toEqual('Hermione')
    expect(settlements[0].amount).toEqual(75)

    expect(settlements[1].payer).toEqual('Ron')
    expect(settlements[1].receiver).toEqual('Hermione')
    expect(settlements[1].amount).toEqual(7)
})

test('useLocalStorage works correctly', async () => {
    let value, setValue
    const Broom = function({ broomName }) {
        [value, setValue] = useLocalStorage('currentBroom', broomName)
        return <div className="broom">{value}</div>
    }

    render(<Broom broomName="Nimbus 2000" />)
    expect(screen.getByText('Nimbus 2000')).toBeInTheDocument()
    setTimeout(() => {
        act(setValue('Firebolt'))
        expect(screen.getByText('Firebolt')).toBeInTheDocument()
    }, 100)
})
