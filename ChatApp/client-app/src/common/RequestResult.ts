export interface RequestOkResult<T> {
    value: T,
    errorMessage: null
    hasValue: true
}

export interface RequestBadResult<T> {
    value: null,
    errorMessage: string,
    hasValue: false
}
export type RequestResult<T> = RequestBadResult<T> | RequestOkResult<T>