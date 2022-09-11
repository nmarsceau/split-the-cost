export const listsEqual = (list1, list2) => {
    if (list1.length !== list2.length) {return false}
    const [a, b] = [[...list1].sort(), [...list2].sort()]
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) {return false}
    }
    return true
}