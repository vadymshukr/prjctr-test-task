export const makeStringWithError = (value: string, length: number) => {
    return value.length <= length ? value : `${value.slice(0, length)}<small>${value.slice(length)}</small>`
}