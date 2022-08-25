export const randomString = () => {
    const max = Number.MAX_SAFE_INTEGER, min = max - 9000000000000000
    return Math.floor(Math.random() * (max - min + 1) + min).toString(36)
}