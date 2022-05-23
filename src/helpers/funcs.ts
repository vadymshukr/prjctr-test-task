export const makeStringWithError = (value: string, length: number) => {
    return value.length <= length ? value : `${value.slice(0, length)}<small>${value.slice(length)}</small>`
}


export const changeRoute = (route: string) => {
    history.pushState({}, '', "/" + route)
    history.pushState({}, '', "/" + route)
    history.go(-1)
}
