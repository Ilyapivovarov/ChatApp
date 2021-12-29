export interface JwtTokenDecode {
    id: number,
    userName: string,
    exp: number
}

export interface User {
    id: number,
    userName: string
}

export interface Message {
    id?: number | null,
    author: User
    body: string,
    chatId: number | string
}

export interface Chat {
    id: number
    admins: User[],
    members: User[],
    messages: Message[]
}

export interface JwtTokenResponse {
    access_token: string
}

export interface SignUp {
    userName: string,
    password: string,
    confirmPassword: string
}

export interface SignIn {
    userName: string,
    password: string,
}