

export const formatDateTime = (date: Date): string | undefined => {
    if (!date) return undefined

    const minute = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes()
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${minute}`
}