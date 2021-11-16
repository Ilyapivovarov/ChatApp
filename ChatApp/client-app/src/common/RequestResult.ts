export interface RequestResult<T> {
    value: T ,
    errorMessage: string  
    isSuccess: boolean
}